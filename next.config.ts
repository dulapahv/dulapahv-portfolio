import type { NextConfig } from 'next';

import { withContentCollections } from '@content-collections/next';
import { withBotId } from 'botid/next/config';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false,
      },
    ];
  },
};

export default withContentCollections(withBotId(nextConfig));
