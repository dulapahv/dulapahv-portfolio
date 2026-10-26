import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

import { AGENT_LINK_HEADER } from "./lib/agent-discovery";

const SPOTIFY_IMAGE_HOST = "i.scdn.co";

const agentDiscoveryHeaders = [{ key: "Link", value: AGENT_LINK_HEADER }];

// Cloudflare replays preconnect/preload Link entries as 103 Early Hints, so the
// browser can open the Spotify art connection while the homepage renders.
const homeHeaders = [
  {
    key: "Link",
    value: `<https://${SPOTIFY_IMAGE_HOST}>; rel=preconnect, ${AGENT_LINK_HEADER}`,
  },
];

const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins,
  experimental: {
    typedEnv: true,
    cssChunking: "graph",
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
    turbopackRustReactCompiler: true,
    turbopackFileSystemCacheForBuild: true,
    turbopackServerSideNestedAsyncChunking: true,
    turbopackSharedRuntime: true,
    turbopackCjsTreeShaking: true,
    turbopackChunking: {
      generateComponentChunks: true,
    },
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
    // inlineCss: true,
  },
  // Cloudflare generates/validates etags at the edge — skipping Next's
  // etag hashing saves per-request CPU on CF Workers.
  generateEtags: false,
  // Scoped to content pages: assets under /_next would pay the extra bytes on
  // every request for headers no agent reads there.
  headers() {
    return Promise.resolve([
      { source: "/", headers: homeHeaders },
      { source: "/contact", headers: agentDiscoveryHeaders },
      { source: "/security", headers: agentDiscoveryHeaders },
      { source: "/:type(blog|project)", headers: agentDiscoveryHeaders },
      { source: "/:type(blog|project)/:slug+", headers: agentDiscoveryHeaders },
    ]);
  },
  // OpenNext lets the Link header above replace the one React emits for font
  // preloads on dynamic pages, dropping them. A zero budget makes React keep
  // those preloads as <link> tags in the HTML instead.
  reactMaxHeadersLength: 0,
  poweredByHeader: false,
  reactCompiler: true,
  logging: {
    browserToTerminal: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    qualities: [50, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: SPOTIFY_IMAGE_HOST,
        pathname: "/image/**",
      },
    ],
  },
  typedRoutes: true,
};

export default withContentCollections(nextConfig);

initOpenNextCloudflareForDev();
