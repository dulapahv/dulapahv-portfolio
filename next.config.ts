import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || "[]"],
  poweredByHeader: false,
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
    optimizePackageImports: ["@phosphor-icons/react"],
  },
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
};

export default withContentCollections(nextConfig);

initOpenNextCloudflareForDev();
