import type { COBEOptions } from 'cobe';

export const IS_DEV_ENV =
  process.env.VERCEL_ENV === 'development' ||
  process.env.NEXT_PUBLIC_ENV === 'development' ||
  process.env.NODE_ENV === 'development';
export const BASE_URL = IS_DEV_ENV ? 'http://localhost:3000' : 'https://dulapahv.dev';
export const ASSETS_URL = 'https://assets.dulapahv.dev';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/dulapahv';
export const GITHUB_URL = 'https://github.com/dulapahv';
export const SPOTIFY_URL = 'https://open.spotify.com/user/31gh2o2edagehgvasq4ov3perrtm';
export const CONTACT_EMAIL = 'contact@dulapahv.dev';

export const NAME = 'Dulapah Vibulsanti';
export const DESCRIPTION =
  'Thai software engineer in Edinburgh, creating accessible, delightful digital experiences that improve lives.';

export const NAME_MAX_LENGTH = 256;
export const EMAIL_MAX_LENGTH = 256;
export const MESSAGE_MAX_LENGTH = 2000;

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const TURNSTILE_SITE_KEY = IS_DEV_ENV
  ? '1x00000000000000000000AA'
  : '0x4AAAAAAACYFWWcTzhCNWz4';

export const EDUCATION_LOCATION: COBEOptions['markers'] = [
  // KMITL, Thailand
  { location: [13.7298889, 100.775652], size: 0.1 },
  // UofG, United Kingdom
  { location: [55.8716946, -4.2913655], size: 0.1 }
];

export const WORK_LOCATION: COBEOptions['markers'] = [
  // NatWest Group, Edinburgh, United Kingdom
  { location: [55.944425, -3.188396], size: 0.1 },
  // GISTDA, Bangkok, Thailand
  { location: [13.864167, 100.5725], size: 0.1 }
];

export const TRAVEL_LOCATIONS: COBEOptions['markers'] = [
  // Tokyo, Japan
  { location: [35.6762, 139.6503], size: 0.1 },
  // Chiang Mai, Thailand
  { location: [18.706064, 98.981716], size: 0.1 },
  // Phuket, Thailand
  { location: [7.880447, 98.392281], size: 0.1 },
  // Nakhon Si Thammarat, Thailand
  { location: [8.432778, 99.963611], size: 0.1 },
  // London, United Kingdom
  { location: [51.5074, -0.1278], size: 0.1 }
];
