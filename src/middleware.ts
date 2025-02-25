import { NextRequest, NextResponse } from 'next/server';

import { get } from '@vercel/edge-config';

import { parseError } from './utils/parse-error';

export const config = {
  matcher: [
    '/experience/:path*',
    '/project/:path*',
    '/blog/:path*',
    '/stack/:path*',
    '/contact/:path*',
    '/login',
    '/dashboard/:path*',
  ],
};

async function getFeatureFlag(flag: string) {
  if (!flag) return false;

  try {
    return await get(flag);
  } catch (error) {
    const message = parseError(error);

    console.error(`Error fetching flag for ${flag}:`, message);

    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const featureEnabled = await getFeatureFlag(pathname.split('/')[1]);

  if (featureEnabled) {
    return NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/maintenance`;
    url.searchParams.set('path', pathname);
    url.searchParams.set('reason', 'feature-flag');
    return NextResponse.rewrite(url);
  }
}
