"use server";

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9-]+$/;
const CONTRIBUTIONS_API_BASE =
  "https://github-contributions-api.jogruber.de/v4";
const REVALIDATE_SECONDS = 3600;

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: (ContributionDay | null)[];
}

export interface GitHubContributionsData {
  weeks: ContributionWeek[];
  totalContributions: number;
  currentYear: string;
}

interface ContributionsApiResponse {
  contributions: Array<{
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
  total?: {
    lastYear?: number;
  };
}

const EMPTY_DATA: GitHubContributionsData = {
  weeks: [],
  totalContributions: 0,
  currentYear: "the last year",
};

function isValidGitHubUsername(username: string): boolean {
  if (typeof username !== "string") {
    return false;
  }
  const trimmed = username.trim();
  if (trimmed.length === 0 || trimmed.length > 39) {
    return false;
  }
  if (!GITHUB_USERNAME_REGEX.test(trimmed)) {
    return false;
  }
  if (trimmed.startsWith("-") || trimmed.endsWith("-")) {
    return false;
  }
  if (trimmed.includes("--")) {
    return false;
  }

  return true;
}

function groupContributionsIntoWeeks(
  contributions: ContributionsApiResponse["contributions"]
): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  let currentWeek: (ContributionDay | null)[] = new Array(7).fill(null);

  for (const contribution of contributions) {
    // Parse as local date so the day-of-week alignment matches the heatmap
    const date = new Date(`${contribution.date}T00:00:00`);
    const dayOfWeek = date.getDay();

    // On Sunday, flush the previous week before starting a new one
    if (dayOfWeek === 0 && currentWeek.some((d) => d !== null)) {
      weeks.push({ days: currentWeek });
      currentWeek = new Array(7).fill(null);
    }

    currentWeek[dayOfWeek] = {
      date: contribution.date,
      count: contribution.count,
      level: contribution.level,
    };
  }

  if (currentWeek.some((d) => d !== null)) {
    weeks.push({ days: currentWeek });
  }

  return weeks;
}

export async function getGitHubContributionsData(
  username: string
): Promise<GitHubContributionsData> {
  try {
    if (!isValidGitHubUsername(username)) {
      throw new Error("Invalid GitHub username");
    }

    const safeUsername = encodeURIComponent(username);

    const response = await fetch(
      `${CONTRIBUTIONS_API_BASE}/${safeUsername}?y=last`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contributions");
    }

    const data: ContributionsApiResponse = await response.json();

    return {
      weeks: groupContributionsIntoWeeks(data.contributions),
      totalContributions: data.total?.lastYear ?? 0,
      currentYear: "the last year",
    };
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return EMPTY_DATA;
  }
}
