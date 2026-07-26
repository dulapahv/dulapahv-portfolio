import { MCP_ENDPOINT } from "@/lib/agent-discovery";
import { BASE_URL, NAME } from "@/lib/constants";

// MCP server card (SEP-1649)
const serverCard = {
  name: "dev.dulapahv/search-agent",
  title: "Search Agent",
  description: `Natural-language search over ${NAME}'s portfolio: blog posts, projects, and work experience.`,
  version: "1.0.0",
  websiteUrl: BASE_URL,
  protocolVersion: "2025-06-18",
  serverInfo: {
    name: "Search Agent",
    version: "1.0.0",
  },
  endpoint: MCP_ENDPOINT,
  remotes: [
    {
      type: "streamable-http",
      url: MCP_ENDPOINT,
    },
  ],
  capabilities: {
    tools: { listChanged: true },
  },
  tools: [
    {
      name: "ask",
      description: "Search and retrieve information based on a query.",
    },
  ],
  resources: [],
  prompts: [],
};

export function GET() {
  return Response.json(serverCard);
}
