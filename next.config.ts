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
  }
};

export default withContentCollections(nextConfig);
