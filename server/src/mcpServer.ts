import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";

const SITEMAP_URL = "https://docs.wavemetrics.com/sitemap.xml";

// --- CommandHelp index ---
interface CommandEntry {
  type: string;
  name: string;
  tooltip: string;
}

let commandEntries: CommandEntry[] = [];

function loadCommandHelp(): void {
  try {
    const filePath = path.join(__dirname, "../src/completionSources/CommandHelp.txt");
    const text = fs.readFileSync(filePath, "utf-8");
    for (const line of text.split("\n")) {
      const tokens = line.split("::");
      if (tokens.length === 3) {
        commandEntries.push({ type: tokens[0].trim(), name: tokens[1].trim(), tooltip: tokens[2].trim() });
      }
    }
  } catch (e) {
    process.stderr.write(`Failed to load CommandHelp.txt: ${e}\n`);
  }
}

function searchCommandHelp(query: string): CommandEntry[] {
  const q = query.toLowerCase();
  // 1. Exact name match
  const exact = commandEntries.filter(e => e.name.toLowerCase() === q);
  if (exact.length > 0) return exact;
  // 2. Starts-with match
  const startsWith = commandEntries.filter(e => e.name.toLowerCase().startsWith(q));
  if (startsWith.length > 0) return startsWith;
  // 3. Contains match (single token)
  const contains = commandEntries.filter(e => e.name.toLowerCase().includes(q));
  if (contains.length > 0) return contains;
  // 4. All-words match: split query on whitespace/punctuation and check that every
  //    word appears somewhere in the lowercased name. This handles queries like
  //    "violin plot" matching "AppendViolinPlot" and "ModifyViolinPlot".
  const words = q.split(/[\s\-_]+/).filter(Boolean);
  if (words.length > 1) {
    return commandEntries.filter(e => {
      const name = e.name.toLowerCase();
      return words.every(w => name.includes(w));
    });
  }
  return [];
}

loadCommandHelp();

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
      res.on("end", () => resolve(Buffer.concat(chunks as Uint8Array[]).toString("utf-8")));
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

server.registerTool(
  "igorpro_find_operations",
  {
    title: "Find Igor Pro operations and functions",
    description:
      "Search the local Igor Pro command index (CommandHelp.txt) to find the exact names of operations, " +
      "functions, or programming topics matching a query. Use this tool FIRST when you are unsure of the " +
      "exact name of an Igor Pro operation or function before calling igorpro_search_documentation. " +
      "For example, query 'violin plot' to discover 'AppendViolinPlot', 'ModifyViolinPlot', etc.",
    inputSchema: {
      query: z.string().describe("A topic, keyword, or partial name to search for in the Igor Pro command index"),
    },
  },
  ({ query }) => {
    const matches = searchCommandHelp(query);
    if (matches.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No operations or functions found matching "${query}" in the Igor Pro command index.`,
          },
        ],
      };
    }
    const lines = matches.map(e => `${e.type}: ${e.name}  —  ${e.tooltip}`);
    return {
      content: [
        {
          type: "text" as const,
          text: `Found ${matches.length} match(es) for "${query}":\n\n${lines.join("\n")}`,
        },
      ],
    };
  }
);

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
  "igorpro_search_documentation",
  {
    title: "Search Igor Pro documentation",
    description:
      "Search for documentation about Igor Pro-related topics from WaveMetrics official documentation website",
    inputSchema: {
      name: z.string().describe("A topic to look up in the Igor Pro documentation, which can be the name of a function or operation or another topic name"),
      category: z.enum(["commands", "programming", "python-reference", "python-general", "analysis", "igor-basics", "graphing", "advanced-topics"]).optional().describe(
        "Optional documentation category to prefer when multiple pages match. " +
        "'commands' for operations/functions, 'programming' for keywords/flow control/operators, " +
        "'python-reference' for Python module reference, 'python-general' for Python overview, " +
        "'analysis' for analysis/stats/curve fitting, 'igor-basics' for waves/data folders, " +
        "'graphing' for graphing topics, 'advanced-topics' for advanced or miscellaneous topics." +
        "Always provide links to the source documentation that the answer is based on."
      ),
    },
  },
  async ({ name: query, category }) => {
    await ensureSitemap();

    // Search CommandHelp.txt for the best-matching canonical name to use for URL resolution
    const matches = searchCommandHelp(query);

    // Try candidates from CommandHelp first (exact → starts-with → contains), then fall back to raw query
    const namesToTry = matches.length > 0
      ? [...matches.map(e => e.name), query]
      : [query];

    let url: string | undefined;
    let resolvedName = query;
    for (const name of namesToTry) {
      url = resolveDocUrl(name, category);
      if (url) {
        resolvedName = name;
        break;
      }
    }

    if (!url) {
      const hint = matches.length > 0
        ? ` Command index matched: ${matches.slice(0, 5).map(e => e.name).join(", ")}${matches.length > 5 ? ", ..." : ""}.`
        : " No entries found in local command index either.";
      return {
        content: [
          {
            type: "text" as const,
            text: `No documentation page found for "${query}".${hint} The sitemap has ${allDocUrls.length} entries.`,
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
            text: `Documentation for "${resolvedName}" (from ${url}):\n\n${text}`,
          },
        ],
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);

      return {
        content: [
          {
            type: "text" as const,
            text: `Found URL ${url} for "${resolvedName}" but could not fetch it: ${message}.`,
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
