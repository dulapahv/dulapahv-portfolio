export const BASE_URL =
  process.env.VERCEL_ENV === "development"
    ? "http://localhost:3000/"
    : `https://${process.env.VERCEL_URL}`;
export const ASSETS_URL = `https://assets.dulapahv.dev`;

export const NAME = "Dulapah Vibulsanti";
export const SHORT_NAME = "DulapahV";
export const SITE_NAME = "DulapahV's Portfolio";
export const DESCRIPTION =
  "This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others.";
export const THEME_COLOR = "#fb568a";

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
