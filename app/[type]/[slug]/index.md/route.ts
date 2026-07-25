import { notFound } from "next/navigation";
import {
  type ContentType,
  getCollection,
  isValidContentType,
} from "@/lib/content-utils/content-utils";
import { markdownResponse } from "@/lib/markdown/markdown-response";
import { buildDetailMarkdown } from "@/lib/markdown/page-markdown";

export const dynamic = "force-static";

export const generateStaticParams = (): { type: string; slug: string }[] => {
  const types: ContentType[] = ["project", "blog"];

  return types.flatMap((type) =>
    getCollection(type).map((item) => ({ type, slug: item._meta.path }))
  );
};

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[type]/[slug]/index.md">
) {
  const { type, slug } = await params;

  if (!isValidContentType(type)) {
    notFound();
  }

  const item = getCollection(type).find((page) => page._meta.path === slug);

  if (!item) {
    notFound();
  }

  return markdownResponse(buildDetailMarkdown(item, type));
}
