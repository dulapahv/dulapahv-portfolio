import type { MetadataRoute } from 'next';

import { BASE_URL } from '@/lib/constants';
import { getCollection, type ContentType } from '@/lib/content-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static pages with high priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Type listing pages
  const typePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/work`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Generate dynamic content pages
  const types: ContentType[] = ['project', 'blog', 'work'];
  const contentPages: MetadataRoute.Sitemap = types.flatMap((type) =>
    getCollection(type).map((page) => {
      // Determine the URL
      const url = `${BASE_URL}/${type}/${page._meta.path}`;

      // Determine lastModified date based on content type
      let lastModified: Date;
      if ('date' in page && page.date) {
        // Blog posts have a single date
        lastModified = page.date;
      } else if ('startDate' in page && page.startDate) {
        // Work and projects have start/end dates
        if ('endDate' in page && page.endDate) {
          lastModified = page.endDate;
        } else {
          lastModified = page.startDate;
        }
      } else {
        // Fallback to current date
        lastModified = currentDate;
      }

      // Determine change frequency
      let changeFrequency:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never';
      if (type === 'blog') {
        changeFrequency = 'yearly';
      } else if (type === 'work' || type === 'project') {
        // Check if it's ongoing/present
        const isOngoing = !('endDate' in page && page.endDate);
        changeFrequency = isOngoing ? 'monthly' : 'yearly';
      } else {
        changeFrequency = 'yearly';
      }

      // Determine priority based on type
      const priority = type === 'blog' ? 0.5 : 0.6;

      return {
        url,
        lastModified,
        changeFrequency,
        priority,
      };
    }),
  );

  // Combine all pages
  return [...staticPages, ...typePages, ...contentPages];
}
