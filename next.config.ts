import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.ALLOWED_DEV_ORIGINS || '[]'],
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    qualities: [75, 100],
  },
  experimental: {
    typedEnv: true,
    viewTransition: true,
  },
};

initOpenNextCloudflareForDev();

export default withContentCollections(nextConfig);
