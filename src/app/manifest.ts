import { MetadataRoute } from 'next';

import { BASE_URL, DESCRIPTION, SITE_NAME, THEME_COLOR } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DESCRIPTION,
    display: 'standalone',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    lang: 'en',
    orientation: 'any',
    dir: 'auto',
    start_url: BASE_URL,
    scope: BASE_URL,
    id: BASE_URL,
    icons: [
      {
        src: '/images/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
      {
        src: '/images/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        src: '/images/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        src: '/images/favicon-128x128.png',
        type: 'image/png',
        sizes: '128x128',
      },
      {
        src: '/images/favicon-196x196.png',
        type: 'image/png',
        sizes: '196x196',
      },
    ],
  };
}
