import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || "[]"],
  cacheComponents: true,
  cacheLife: {
    spotify: {
      stale: 600,
      revalidate: 3600,
      expire: 86_400,
    },
    github: {
      stale: 600,
      revalidate: 3600,
      expire: 86_400,
    },
  },
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
