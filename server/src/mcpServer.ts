import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as https from "https";

const DOCS_BASE_URL = "https://docs.wavemetrics.com/igorpro/commands";

function fetchPage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchPage(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function htmlToText(html: string): string {
  // Extract the main content area
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  let content = mainMatch ? mainMatch[1] : html;

  // Remove script/style tags and their contents
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "");

  // Convert table rows to readable format
  content = content.replace(/<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi,
    (_, col1, col2) => `${col1.replace(/<[^>]+>/g, "").trim()}: ${col2.replace(/<[^>]+>/g, "").trim()}\n`);

  // Convert headers
  content = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, t) => `# ${t.replace(/<[^>]+>/g, "").trim()}\n\n`);
  content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, t) => `## ${t.replace(/<[^>]+>/g, "").trim()}\n\n`);
  content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, t) => `### ${t.replace(/<[^>]+>/g, "").trim()}\n\n`);

  // Convert code blocks
  content = content.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${c.replace(/<[^>]+>/g, "").trim()}\``);
  content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, c) => `\n\`\`\`\n${c.replace(/<[^>]+>/g, "").trim()}\n\`\`\`\n`);

  // Convert paragraphs and line breaks
  content = content.replace(/<br\s*\/?>/gi, "\n");
  content = content.replace(/<\/p>/gi, "\n\n");
  content = content.replace(/<p[^>]*>/gi, "");

  // Convert list items
  content = content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `- ${t.replace(/<[^>]+>/g, "").trim()}\n`);

  // Strip remaining HTML tags
  content = content.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  content = content.replace(/&amp;/g, "&");
  content = content.replace(/&lt;/g, "<");
  content = content.replace(/&gt;/g, ">");
  content = content.replace(/&quot;/g, "\"");
  content = content.replace(/&#39;/g, "'");
  content = content.replace(/&nbsp;/g, " ");

  // Clean up whitespace
  content = content.replace(/\n{3,}/g, "\n\n");
  content = content.trim();

  return content;
}

const server = new McpServer({
  name: "Igor Pro",
  version: "1.0.0",
});

server.registerPrompt(
  "igorpro_coding_instructions",
  {
    title: "Igor Pro coding instructions",
    description: "Instructions for writing and formatting Igor Pro code",
  },
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "When generating Igor Pro code, always use the language identifier `igorpro` for fenced code blocks.",
            "For example:",
            "```igorpro",
            "Function MyFunc(x)",
            "    Variable x",
            "    return x * 2",
            "End",
            "```",
            "Never use `igor`, `c`, or plain text for Igor Pro code blocks.",
          ].join("\n"),
        },
      },
    ],
  })
);

server.registerTool(
  "igorpro_lookup_command",
  {
    title: "Look up Igor Pro command",
    description:
      "Look up documentation for an Igor Pro function, operation, or programming topic by name. Fetches the full documentation from docs.wavemetrics.com.",
    inputSchema: {
      name: z.string().describe("The name of the Igor Pro command to look up (e.g. 'Display', 'abs', 'for')"),
    },
  },
  async ({ name: query }) => {
    const url = `${DOCS_BASE_URL}/${encodeURIComponent(query.toLowerCase())}`;

    try {
      const html = await fetchPage(url);
      const text = htmlToText(html);

      if (!text) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No documentation found for "${query}". Try using igorpro_search_commands to find the correct name.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: `Documentation for "${query}" (from ${url}):\n\n${text}`,
          },
        ],
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      return {
        content: [
          {
            type: "text" as const,
            text: `No documentation found for "${query}". Could not fetch online docs: ${message}.`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  process.stderr.write(`MCP server error: ${error}\n`);
  process.exit(1);
});
