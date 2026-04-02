import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as https from "https";

const SITEMAP_URL = "https://docs.wavemetrics.com/sitemap.xml";

// Maps lowercase last-path-segment -> full URLs
let sitemapIndex: Map<string, string[]> = new Map();
let allDocUrls: string[] = [];
let sitemapLoaded = false;

function parseSitemapUrls(xml: string): string[] {
  const urls: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function buildSitemapIndex(urls: string[]): Map<string, string[]> {
  const index = new Map<string, string[]>();
  for (const url of urls) {
    const path = new URL(url).pathname;
    const segments = path.split("/").filter(Boolean);
    const slug = segments[segments.length - 1]?.toLowerCase();
    if (slug) {
      const existing = index.get(slug) || [];
      existing.push(url);
      index.set(slug, existing);
    }
  }
  return index;
}

async function ensureSitemap(): Promise<void> {
  if (sitemapLoaded) return;
  try {
    const xml = await fetchPage(SITEMAP_URL);
    allDocUrls = parseSitemapUrls(xml);
    sitemapIndex = buildSitemapIndex(allDocUrls);
    sitemapLoaded = true;
  } catch (e) {
    process.stderr.write(`Failed to fetch sitemap: ${e}\n`);
  }
}

const categoryPaths: Record<string, string[]> = {
  "commands": ["/commands/"],
  "programming": ["/programming/"],
  "python-reference": ["/python/python-module-reference/"],
  "python-general": ["/python/python-overview/", "/python/"],
  "analysis": ["/analysis/"],
  "igor-basics": ["/igor-basics/"],
  "graphing": ["/graphing/"],
  "advanced-topics": ["/advanced-topics/"],
};

function preferUrl(urls: string[], category?: string): string | undefined {
  if (urls.length === 0) return undefined;
  if (category) {
    const prefixes = categoryPaths[category];
    if (prefixes) {
      for (const prefix of prefixes) {
        const match = urls.find(u => new URL(u).pathname.includes(prefix));
        if (match) return match;
      }
    }
  }
  // Default: prefer /commands/ for backward compatibility
  return urls.find(u => u.includes("/commands/")) || urls[0];
}

function resolveDocUrl(query: string, category?: string): string | undefined {
  const q = query.toLowerCase().replace(/\s+/g, "-");

  // 1. Exact slug match
  const exact = sitemapIndex.get(q);
  if (exact && exact.length > 0) {
    return preferUrl(exact, category);
  }

  // 2. Substring match on path segments
  const substring = allDocUrls.filter(u => {
    const path = new URL(u).pathname.toLowerCase();
    return path.includes(`/${q}`);
  });
  if (substring.length > 0) {
    return preferUrl(substring, category);
  }

  return undefined;
}

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

server.registerPrompt(
  "igorpro_documentation_lookup",
  {
    title: "Igor Pro documentation lookup",
    description: "Instructions for looking up documentation for Igor Pro",
  },
  () => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: [
            "When looking up documentation, use the following base URLs for different categories of lookup:",
            "Operations and Function names: https://docs.wavemetrics.com/igorpro/commands",
            "Programming-related topics like keywords, flow control, operators: https://docs.wavemetrics.com/igorpro/programming",
            "Python reference material (not Python operations): https://docs.wavemetrics.com/igorpro/python/python-module-reference",
            "Python general information: https://docs.wavemetrics.com/igorpro/python/python-overview",
            "Analysis, Stats, Curve Fitting: https://docs.wavemetrics.com/igorpro/analysis",
            "Basic Igor information (waves, data folders, etc.): https://docs.wavemetrics.com/igorpro/igor-basics",
            "Graphing: https://docs.wavemetrics.com/graphing",
            "Advanced topics or other miscellaneous topics: https://docs.wavemetrics.com/igorpro/advanced-topics",
            "Many of these URLs are 404 because they don't have a landing page but do have child pages that are relevant."
          ].join("\n"),
        },
      },
    ],
  })
);

server.registerTool(
  "igorpro_search_documentation",
  {
    title: "Look up Igor Pro documentation",
    description:
      "Look up documentation for an Igor Pro function, operation, or programming topic by name. Fetches the full documentation from docs.wavemetrics.com.",
    inputSchema: {
      name: z.string().describe("A topic to look up in the Igor Pro documentation, which can be the name of a function or operation or another topic name"),
      category: z.enum(["commands", "programming", "python-reference", "python-general", "analysis", "igor-basics", "graphing", "advanced-topics"]).optional().describe(
        "Optional documentation category to prefer when multiple pages match. " +
        "'commands' for operations/functions, 'programming' for keywords/flow control/operators, " +
        "'python-reference' for Python module reference, 'python-general' for Python overview, " +
        "'analysis' for analysis/stats/curve fitting, 'igor-basics' for waves/data folders, " +
        "'graphing' for graphing topics, 'advanced-topics' for advanced or miscellaneous topics."
      ),
    },
  },
  async ({ name: query, category }) => {
    await ensureSitemap();

    const url = resolveDocUrl(query, category);

    if (!url) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No documentation page found for "${query}". The sitemap has ${allDocUrls.length} entries but none matched. Try a different name or check spelling.`,
          },
        ],
      };
    }

    try {
      const html = await fetchPage(url);
      const text = htmlToText(html);

      if (!text) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Page found at ${url} but no content could be extracted for "${query}".`,
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
            text: `Found URL ${url} for "${query}" but could not fetch it: ${message}.`,
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
