import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || "[]"],
  reactCompiler: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
    ],
  },
  experimental: {
    typedEnv: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default withContentCollections(nextConfig);

initOpenNextCloudflareForDev();
