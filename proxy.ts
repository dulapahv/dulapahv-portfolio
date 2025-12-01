import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const contentMatch = pathname.match(/^\/(blog|project)\/.*\.(md|mdx)$/);

  if (contentMatch) {
    const newPath = pathname.replace(/\.md$/, '.mdx');
    const githubUrl = `https://raw.githubusercontent.com/dulapahv/dulapahv-portfolio/refs/heads/main/content${newPath}`;

    try {
      const response = await fetch(githubUrl);

      if (response.status === 404) {
        return new Response(
          '# 404 - Content Not Found\n\nThe requested markdown file does not exist in the portfolio repository.\n\nPlease check the URL and try again.',
          {
            status: 404,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-cache'
            }
          }
        );
      }

      if (response.ok) {
        const content = await response.text();
        return new Response(content, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Disposition': 'inline',
            'Content-Security-Policy': "default-src 'none'",
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=300, must-revalidate' // 5 minutes
          }
        });
      }

      return new Response(`Error fetching content: ${response.status} ${response.statusText}`, {
        status: response.status,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });
    } catch (error) {
      return new Response(`Error fetching content: ${error}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(blog|project)/:path*.md', '/(blog|project)/:path*.mdx']
};
