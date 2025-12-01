'use server';

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

// Manually filtered out contributions (e.g., spam, irrelevant, test PRs)
const FILTERED_URLS: string[] = [
  'https://github.com/dulapahv/Issho/issues/2',
  'https://github.com/dulapahv/Issho/issues/1',
  'https://github.com/dulapahv/dulapahv-portfolio/pull/99',
  'https://github.com/dulapahv/dulapahv-portfolio/pull/98',
  'https://github.com/dulapahv/dulapahv-portfolio/pull/97',
  'https://github.com/dulapahv/CodeX/pull/7',
  'https://github.com/dulapahv/gistda-sphere-reactjs/pull/14',
  'https://github.com/dulapahv/gistda-sphere-reactjs/pull/13',
  'https://github.com/dulapahv/CodeX/issues/2',
  'https://github.com/dulapahv/CodeX/issues/1',
  'https://github.com/dulapahv/gistda-sphere-reactjs/pull/4',
  'https://github.com/dulapahv/dulapahv-portfolio/pull/41',
  'https://github.com/dulapahv/dulapahv-portfolio/pull/40',
  'https://github.com/vercel/next.js/issues/60006',
  'https://github.com/dulapahv/dulapahv/pull/1',
  'https://github.com/dulapahv/v2-dulapahv-portfolio/pull/1',
  'https://github.com/dulapahv/Bookstore/pull/13',
  'https://github.com/dulapahv/Bookstore/pull/12',
  'https://github.com/dulapahv/Bookstore/pull/11',
  'https://github.com/dulapahv/Bookstore/pull/10',
  'https://github.com/dulapahv/Bookstore/pull/9',
  'https://github.com/dulapahv/Bookstore/pull/8',
  'https://github.com/dulapahv/Bookstore/pull/5',
  'https://github.com/dulapahv/Bookstore/pull/4',
  'https://github.com/doki-theme/doki-master-theme/issues/124',
  'https://github.com/dulapahv/Bookstore/pull/2',
  'https://github.com/dulapahv/AceMath/pull/1'
];

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

  return data.items
    .map(item => mapGitHubItemToContribution(item, contributionType))
    .filter(contribution => !FILTERED_URLS.includes(contribution.url));
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

export async function getContributionsByYear(
  contributions: Contribution[]
): Promise<Record<number, Contribution[]>> {
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

export async function getContributionStats(contributions: Contribution[]) {
  return {
    total: contributions.length,
    merged: contributions.filter(c => c.status === 'MERGED').length,
    open: contributions.filter(c => c.status === 'OPEN').length,
    closed: contributions.filter(c => c.status === 'CLOSED').length
  };
}
