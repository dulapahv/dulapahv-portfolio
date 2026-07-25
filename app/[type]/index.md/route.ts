import { notFound } from "next/navigation";
import {
  type ContentType,
  isValidContentType,
} from "@/lib/content-utils/content-utils";
import { markdownResponse } from "@/lib/markdown/markdown-response";
import { buildListingMarkdown } from "@/lib/markdown/page-markdown";

export const dynamic = "force-static";

export const generateStaticParams = (): { type: ContentType }[] => [
  { type: "project" },
  { type: "blog" },
];

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[type]/index.md">
) {
  const { type } = await params;

  if (!isValidContentType(type)) {
    notFound();
  }

  return markdownResponse(buildListingMarkdown(type));
}
