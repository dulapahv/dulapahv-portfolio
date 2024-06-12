import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: [
    "/experience/:path*",
    "/project/:path*",
    "/blog/:path*",
    "/stack/:path*",
    "/contact/:path*",
    "/(images/.*)",
  ],
};

async function getFeatureFlag(flag: string) {
  if (!flag) return false;

  try {
    return await get(flag);
  } catch (error) {
    console.error(`Error fetching flag for ${flag}:`, error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/images/")) {
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set(
      "x-vercel-protection-bypass",
      process.env.VERCEL_AUTOMATION_BYPASS_SECRET as string,
    );

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    const featureEnabled = await getFeatureFlag(pathname.split("/")[1]);

    if (featureEnabled) {
      return NextResponse.next();
    } else {
      const url = request.nextUrl.clone();
      url.pathname = `/maintenance`;
      url.searchParams.set("path", pathname);
      url.searchParams.set("reason", "feature-flag");
      return NextResponse.rewrite(url);
    }
  }
}
