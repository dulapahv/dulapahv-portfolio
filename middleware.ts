import { type NextRequest, NextResponse } from "next/server";

const MARKDOWN_TYPE = "text/markdown";
const HTML_TYPE = "text/html";
const MARKDOWN_SUFFIX = "/index.md";
const TRAILING_SLASH = /\/$/;

/**
 * Quality value a client assigned to a media type, per RFC 9110. Absent types
 * score 0 so they always lose to something explicitly listed.
 */
const qualityOf = (accept: string, mediaType: string): number => {
  for (const entry of accept.split(",")) {
    const [type, ...parameters] = entry.trim().split(";");

    if (type.trim().toLowerCase() !== mediaType) {
      continue;
    }

    const q = parameters
      .map((parameter) => parameter.trim())
      .find((parameter) => parameter.startsWith("q="));

    return q ? Number.parseFloat(q.slice(2)) : 1;
  }

  return 0;
};

// Browsers never list text/markdown, so the cheap presence check rejects them
// before any parsing. The quality comparison then honours a client that ranks
// HTML above Markdown rather than assuming any mention means a preference.
const prefersMarkdown = (accept: string | null): boolean => {
  if (!accept?.toLowerCase().includes(MARKDOWN_TYPE)) {
    return false;
  }

  const normalized = accept.toLowerCase();

  return (
    qualityOf(normalized, MARKDOWN_TYPE) >= qualityOf(normalized, HTML_TYPE)
  );
};

export function middleware(request: NextRequest) {
  if (!prefersMarkdown(request.headers.get("accept"))) {
    // The HTML representation varies by Accept too, otherwise a cache could
    // replay it to an agent that asked for Markdown.
    const response = NextResponse.next();
    response.headers.append("Vary", "accept");
    return response;
  }

  const url = request.nextUrl.clone();
  const base =
    url.pathname === "/" ? "" : url.pathname.replace(TRAILING_SLASH, "");
  url.pathname = `${base}${MARKDOWN_SUFFIX}`;

  return NextResponse.rewrite(url);
}

// Scoped to the pages that have a Markdown twin. Everything else — including
// every asset under /_next — skips the middleware worker entirely.
export const config = {
  matcher: [
    "/",
    "/contact",
    "/blog",
    "/project",
    "/blog/:slug",
    "/project/:slug",
  ],
};
