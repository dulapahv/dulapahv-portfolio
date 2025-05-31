import type { COBEOptions } from 'cobe';

export const IS_DEV_ENV =
  process.env.VERCEL_ENV === 'development' ||
  process.env.NEXT_PUBLIC_ENV === 'development' ||
  process.env.NODE_ENV === 'development';
export const BASE_URL = IS_DEV_ENV
  ? 'http://localhost:3000'
  : 'https://dulapahv.dev';
export const BASE_SERVER_URL = IS_DEV_ENV
  ? 'http://localhost:3001'
  : 'https://codex-server.dulapahv.dev';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/dulapahv';
export const GITHUB_URL = 'https://github.com/dulapahv';

export const NAME = 'DulapahV';
export const NAME_MAX_LENGTH = 256;
export const EMAIL_MAX_LENGTH = 256;
export const MESSAGE_MAX_LENGTH = 1000;
export const CAPTCHA_URL = 'https://verify.dulapahv.dev';
export const CLOUDFLARE_TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '';

export const EDUCATION_LOCATION: COBEOptions['markers'] = [
  // KMITL, Thailand
  { location: [13.7298889, 100.775652], size: 0.1 },

  // UofG, United Kingdom
  { location: [55.8716946, -4.2913655], size: 0.1 },
];
