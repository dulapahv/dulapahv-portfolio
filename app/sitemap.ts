import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/constants";
import {
  type ContentType,
  getCollection,
} from "@/lib/content-utils/content-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const llmPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/llms-full.txt`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/bio.txt`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.35,
    },
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const typePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/project`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Helper function to determine last modified date
  const getLastModified = (
    page: ReturnType<typeof getCollection>[number],
    fallback: Date
  ): Date => {
    if ("date" in page && page.date) {
      return page.date;
    }
    if ("startDate" in page && page.startDate) {
      if ("endDate" in page && page.endDate) {
        return page.endDate;
      }
      return page.startDate;
    }
    return fallback;
  };

  // Helper function to determine change frequency
  const getChangeFrequency = (
    type: ContentType,
    page: ReturnType<typeof getCollection>[number]
  ):
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never" => {
    if (type === "blog") {
      return "yearly";
    }
    if (type === "project") {
      const isOngoing = !("endDate" in page && page.endDate);
      return isOngoing ? "monthly" : "yearly";
    }
    return "yearly";
  };

  const types: ContentType[] = ["project", "blog"];
  const contentPages: MetadataRoute.Sitemap = types.flatMap((type) =>
    getCollection(type).map((page) => ({
      url: `${BASE_URL}/${type}/${page._meta.path}`,
      lastModified: getLastModified(page, currentDate),
      changeFrequency: getChangeFrequency(type, page),
      priority: type === "blog" ? 0.5 : 0.6,
    }))
  );

  return [...llmPages, ...staticPages, ...typePages, ...contentPages];
}
