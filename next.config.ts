import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || '[]'],
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    qualities: [75, 100],
  },
  experimental: {
    typedEnv: true,
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination:
          'https://1drv.ms/b/c/bac8961c289dd3e4/EboeX5e_xXZNrQKQv5skNkMBjebYxatKHkIFgHb2-0-3pA',
        permanent: true,
      },
      {
        source: '/admin',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false,
      },
    ];
  },
};

export default withContentCollections(withBotId(nextConfig));
