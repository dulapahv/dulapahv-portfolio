import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || '[]'],
  reactCompiler: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    qualities: [75, 100]
  },
  experimental: {
    typedEnv: true,
    viewTransition: true,
    turbopackFileSystemCacheForDev: true
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination:
          'https://1drv.ms/b/c/bac8961c289dd3e4/EboeX5e_xXZNrQKQv5skNkMBjebYxatKHkIFgHb2-0-3pA',
        permanent: true
      },
      {
        source: '/internship(.pdf)?',
        destination: 'https://assets.dulapahv.dev/internship.pdf',
        permanent: true
      }
    ];
  }
};

export default withContentCollections(nextConfig);
