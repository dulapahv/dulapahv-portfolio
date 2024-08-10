import { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/constants";

export const runtime = "edge";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/blue.png", "/pink.png", "/fallback.png"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
