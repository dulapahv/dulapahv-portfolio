import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

import { AGENT_LINK_HEADER } from "./lib/agent-discovery";

const agentDiscoveryHeaders = [{ key: "Link", value: AGENT_LINK_HEADER }];

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || "[]"],
  // Cloudflare's edge already gzip/brotli-compresses responses — skipping
  // Next's in-worker compression saves per-request CPU on CF Workers.
  compress: false,
  experimental: {
    typedEnv: true,
    viewTransition: true,
    cssChunking: "strict",
    optimizePackageImports: ["@phosphor-icons/react"],
    turbopackFileSystemCacheForBuild: true,
    turbopackServerSideNestedAsyncChunking: true,
    // inlineCss: true,
  },
  // Cloudflare generates/validates etags at the edge — skipping Next's
  // etag hashing saves per-request CPU on CF Workers.
  generateEtags: false,
  // Scoped to content pages: assets under /_next would pay the extra bytes on
  // every request for headers no agent reads there.
  headers() {
    return Promise.resolve([
      { source: "/", headers: agentDiscoveryHeaders },
      { source: "/contact", headers: agentDiscoveryHeaders },
      { source: "/:type(blog|project)", headers: agentDiscoveryHeaders },
      { source: "/:type(blog|project)/:slug+", headers: agentDiscoveryHeaders },
    ]);
  },
  poweredByHeader: false,
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    qualities: [1, 25, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
    ],
  },
  typedRoutes: true,
};

export default withContentCollections(nextConfig);

initOpenNextCloudflareForDev();
