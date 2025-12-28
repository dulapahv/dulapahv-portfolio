'use server';

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: (ContributionDay | null)[];
}

function isValidGitHubUsername(username: string): boolean {
  if (typeof username !== 'string') return false;
  const trimmed = username.trim();
  if (trimmed.length === 0 || trimmed.length > 39) return false;
  if (!/^[a-zA-Z0-9-]+$/.test(trimmed)) return false;
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) return false;
  if (trimmed.includes('--')) return false;
  return true;
}

export async function getGitHubContributions(username: string): Promise<ContributionWeek[]> {
  try {
    if (!isValidGitHubUsername(username)) {
      throw new Error('Invalid GitHub username');
    }

    const safeUsername = encodeURIComponent(username);

    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${safeUsername}?y=last`,
      {
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await response.json();

    // The API returns all days in chronological order for the last year
    // We need to group them into weeks (Sunday to Saturday)
    const weeks: ContributionWeek[] = [];
    const contributions = data.contributions as Array<{
      date: string;
      count: number;
      level: 0 | 1 | 2 | 3 | 4;
    }>;

    // Group contributions into weeks
    let currentWeek: (ContributionDay | null)[] = new Array(7).fill(null);

    contributions.forEach(contribution => {
      const date = new Date(contribution.date + 'T00:00:00'); // Parse as local date
      const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

      const day: ContributionDay = {
        date: contribution.date,
        count: contribution.count,
        level: contribution.level
      };

      // If we hit Sunday and it's not the first day, complete the previous week
      if (dayOfWeek === 0 && currentWeek.some(d => d !== null)) {
        weeks.push({ days: currentWeek });
        currentWeek = new Array(7).fill(null);
      }

      // Add the day to the current week
      currentWeek[dayOfWeek] = day;
    });

    // Push the last week if it has any data
    if (currentWeek.some(d => d !== null)) {
      weeks.push({ days: currentWeek });
    }

    return weeks;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return [];
  }
}

export async function getContributionStats(username: string) {
  try {
    if (!isValidGitHubUsername(username)) {
      throw new Error('Invalid GitHub username');
    }

    const safeUsername = encodeURIComponent(username);

    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${safeUsername}?y=last`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch contributions');
    }

    const data = await response.json();

    // Calculate total from the contributions array
    const total = data.total?.lastYear || 0;

    return {
      totalContributions: total,
      currentYear: 'the last year'
    };
  } catch (error) {
    console.error('Error fetching contribution stats:', error);
    return {
      totalContributions: 0,
      currentYear: 'the last year'
    };
  }
}
