import { NextResponse, type NextRequest } from 'next/server';

const VALID_TYPES = new Set(['blog', 'project', 'work']);
const EXTENSION_REGEX = /^\/([^/]+)\/([^/]+)\.mdx?$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const match = pathname.match(EXTENSION_REGEX);
  if (!match) return NextResponse.next();

  const [, type, slug] = match;

  if (VALID_TYPES.has(type)) {
    return NextResponse.rewrite(
      new URL(`/api/markdown/${type}/${slug}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(blog|project|work)/:path*.md',
    '/(blog|project|work)/:path*.mdx',
  ],
};
