import { markdownResponse } from "@/lib/markdown/markdown-response";
import { buildContactMarkdown } from "@/lib/markdown/page-markdown";

export const dynamic = "force-static";

export function GET() {
  return markdownResponse(buildContactMarkdown());
}
