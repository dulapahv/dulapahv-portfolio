import { MetadataRoute } from 'next';

import { BASE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/pinku.png', '/ao.png', '/fallback.png'],
      },
      {
        userAgent: 'ia_archiver',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
