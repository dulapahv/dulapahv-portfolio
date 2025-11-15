export type ContributionStatus = 'MERGED' | 'OPEN' | 'CLOSED' | 'DRAFT';

export type Contribution = {
  title: string;
  repository: string;
  number: number;
  url: string;
  date: Date;
  status: ContributionStatus;
  type: 'PR' | 'ISSUE';
};

const GITHUB_USERNAME = 'dulapahv';
const GITHUB_API_BASE = 'https://api.github.com';

type GitHubIssueItem = {
  title: string;
  html_url: string;
  number: number;
  repository_url: string;
  created_at: string;
  state: string;
  draft?: boolean;
  pull_request?: {
    merged_at: string | null;
  };
};

type GitHubSearchResponse = {
  items: GitHubIssueItem[];
};

function mapGitHubItemToContribution(item: GitHubIssueItem, type: 'PR' | 'ISSUE'): Contribution {
  const repository = item.repository_url.replace(`${GITHUB_API_BASE}/repos/`, '');

  let status: ContributionStatus;
  if (type === 'PR') {
    if (item.draft) {
      status = 'DRAFT';
    } else if (item.pull_request?.merged_at) {
      status = 'MERGED';
    } else if (item.state === 'open') {
      status = 'OPEN';
    } else {
      status = 'CLOSED';
    }
  } else {
    status = item.state === 'open' ? 'OPEN' : 'CLOSED';
  }

  return {
    title: item.title,
    repository,
    number: item.number,
    url: item.html_url,
    date: new Date(item.created_at),
    status,
    type
  };
}

async function fetchGitHubContributions(type: 'pr' | 'issue'): Promise<Contribution[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const searchQuery = `author:${GITHUB_USERNAME}+type:${type}`;
  const url = `${GITHUB_API_BASE}/search/issues?q=${searchQuery}&per_page=100`;

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}s: ${response.status} ${response.statusText}`);
  }

  const data: GitHubSearchResponse = await response.json();
  const contributionType = type === 'pr' ? 'PR' : 'ISSUE';

  return data.items.map(item => mapGitHubItemToContribution(item, contributionType));
}

export async function getContributions(): Promise<Contribution[]> {
  try {
    const [prs, issues] = await Promise.all([
      fetchGitHubContributions('pr'),
      fetchGitHubContributions('issue')
    ]);

    return [...prs, ...issues];
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}

export function getContributionsByYear(
  contributions: Contribution[]
): Record<number, Contribution[]> {
  return contributions
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .reduce(
      (acc, contribution) => {
        const year = contribution.date.getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(contribution);
        return acc;
      },
      {} as Record<number, Contribution[]>
    );
}

export function getContributionStats(contributions: Contribution[]) {
  return {
    total: contributions.length,
    merged: contributions.filter(c => c.status === 'MERGED').length,
    open: contributions.filter(c => c.status === 'OPEN').length,
    closed: contributions.filter(c => c.status === 'CLOSED').length
  };
}
