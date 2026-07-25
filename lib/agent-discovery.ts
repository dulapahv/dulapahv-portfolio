export const CONTENT_SIGNAL = "ai-train=no, search=yes, ai-input=yes";

export const MCP_ENDPOINT = "https://chat.dulapahv.dev/mcp";

export const MCP_SERVER_CARD_PATH = "/.well-known/mcp/server-card.json";

export const AGENT_LINK_HEADER = [
  '</llms.txt>; rel="describedby"; type="text/plain"; title="Portfolio summary for language models"',
  '</llms-full.txt>; rel="alternate"; type="text/plain"; title="Full portfolio for language models"',
  '</bio.txt>; rel="alternate"; type="text/plain"; title="Biography for language models"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  `<${MCP_SERVER_CARD_PATH}>; rel="service-desc"; type="application/json"; title="MCP server card"`,
].join(", ");
