import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    viewTransition: true,
  },
};

export default withContentCollections(nextConfig);
