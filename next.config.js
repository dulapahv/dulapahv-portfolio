/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  async redirects() {
    return [
      {
        source: '/internship.pdf',
        has: [
          {
            type: 'host',
            value: 'dulapahv.dev',
          },
          {
            type: 'host',
            value: 'www.dulapahv.dev',
          },
          {
            type: 'host',
            value: 'dev.dulapahv.dev',
          },
        ],
        destination: 'https://assets.dulapahv.dev/internship.pdf',
        has: [
          {
            type: 'host',
            value: 'dulapahv.dev',
          },
          {
            type: 'host',
            value: 'www.dulapahv.dev',
          },
          {
            type: 'host',
            value: 'dev.dulapahv.dev',
          },
        ],
        permanent: true,
      },
      {
        source: '/gistda',
        has: [
          {
            type: 'host',
            value: 'dulapahv.dev',
          },
          {
            type: 'host',
            value: 'www.dulapahv.dev',
          },
          {
            type: 'host',
            value: 'dev.dulapahv.dev',
          },
        ],
        destination: 'https://opendata.gistda.or.th/dulapahv/internship/',
        permanent: true,
      },
      {
        source: '/notion/:slug*',
        has: [
          {
            type: 'host',
            value: 'dulapahv.dev',
          },
          {
            type: 'host',
            value: 'www.dulapahv.dev',
          },
          {
            type: 'host',
            value: 'dev.dulapahv.dev',
          },
        ],
        destination: 'https://dulapahv.notion.site/:slug*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.dulapahv.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
});

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'dulapahv',
    project: 'dulapahv-portfolio',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
