import type { COBEOptions } from "cobe";

export const BASE_URL =
  process.env.VERCEL_ENV === "development" ||
  process.env.NEXT_PUBLIC_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_ENV === "preview"
      ? `https://dev.dulapahv.dev`
      : "https://dulapahv.dev";
export const ASSETS_URL = "https://assets.dulapahv.dev";
export const CAPTCHA_URL = "https://verify.dulapahv.dev/validate-captcha";

export const NAME = "Dulapah Vibulsanti";
export const SHORT_NAME = "DulapahV";
export const SITE_NAME = "DulapahV's Portfolio";
export const DESCRIPTION = `Hello, I'm ${NAME}, a Thai Software Engineer based in Glasgow, Scotland. I'm passionate about making technology accessible to everyone. I'm currently a Software Engineer Intern at NatWest Group — a British banking and insurance holding company.`;
export const LINKEDIN_URL = "https://linkedin.com/in/dulapahv";
export const GITHUB_URL = "https://github.com/dulapahv";

export const THEME_COLOR = "#fb568a";

export const CLOUDFLARE_TURNSTILE_SITE_KEY = "0x4AAAAAAACYFWWcTzhCNWz4";

export const NAME_MAX_LENGTH = 180;
export const EMAIL_MAX_LENGTH = 180;
export const MESSAGE_MAX_LENGTH = 1000;

export const itemsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

export const sortByOptions = [
  { key: "start-date-asc", label: "Start date (oldest)" },
  { key: "start-date-desc", label: "Start date (newest)" },
  { key: "end-date-asc", label: "End date (oldest)" },
  { key: "end-date-desc", label: "End date (newest)" },
];

export const typeOptions = [
  { key: "professional", label: "Professional" },
  { key: "personal", label: "Personal" },
];

export const sortByCreatedAtOptions = [
  { key: "date-asc", label: "Date (oldest)" },
  { key: "date-desc", label: "Date (newest)" },
];

export const contactTypeOptions = [
  {
    key: "general",
    label: "General inquiry",
    description: "Job offer / question / feedback.",
  },
  {
    key: "contract",
    label: "Contract work",
    description: "Hire for a project.",
  },
  {
    key: "other",
    label: "Other",
    description: "Anything else.",
  },
];

export const LIVED_LOCATIONS: COBEOptions["markers"] = [
  // Bangkok, thailand
  { location: [13.7563, 100.5018], size: 0.2 },

  // Glasgow, Scotland
  { location: [55.8617, 4.2583], size: 0.2 },
];

export const VISITED_LOCATIONS: COBEOptions["markers"] = [
  // Ayutthaya, Thailand
  { location: [14.3692, 100.5877], size: 0.1 },

  // Chiang Mai, Thailand
  { location: [18.7883, 98.9853], size: 0.1 },

  // Nakhon Si Thammarat, Thailand
  { location: [8.4325, 99.9599], size: 0.1 },

  // Phuket, Thailand
  { location: [7.8804, 98.3923], size: 0.1 },

  // Trat, Thailand
  { location: [12.4202, 102.5298], size: 0.1 },

  // Kuala Lumpur, Malaysia
  { location: [3.1319, 101.6841], size: 0.1 },

  // Edinburgh, Scotland
  { location: [55.9533, 3.1883], size: 0.1 },

  // London, England
  { location: [51.5074, 0.1278], size: 0.1 },
];
