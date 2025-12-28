import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/constants";
import { type ContentType, getCollection } from "@/lib/content-utils";

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

  const types: ContentType[] = ["project", "blog"];
  const contentPages: MetadataRoute.Sitemap = types.flatMap((type) =>
    getCollection(type).map((page) => {
      const url = `${BASE_URL}/${type}/${page._meta.path}`;

      let lastModified: Date;
      if ("date" in page && page.date) {
        lastModified = page.date;
      } else if ("startDate" in page && page.startDate) {
        if ("endDate" in page && page.endDate) {
          lastModified = page.endDate;
        } else {
          lastModified = page.startDate;
        }
      } else {
        lastModified = currentDate;
      }

      let changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never";
      if (type === "blog") {
        changeFrequency = "yearly";
      } else if (type === "project") {
        const isOngoing = !("endDate" in page && page.endDate);
        changeFrequency = isOngoing ? "monthly" : "yearly";
      } else {
        changeFrequency = "yearly";
      }

      const priority = type === "blog" ? 0.5 : 0.6;

      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    })
  );

  return [...llmPages, ...staticPages, ...typePages, ...contentPages];
}
