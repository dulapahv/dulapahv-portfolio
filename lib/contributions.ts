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

export const contributionsData: Contribution[] = [
  {
    title: 'fix: include width param in Cloudflare image loader to resolve Next.js warnings',
    repository: 'opennextjs/docs',
    number: 190,
    url: 'https://github.com/opennextjs/docs/pull/190',
    date: new Date('2025-11-10'),
    status: 'MERGED',
    type: 'PR'
  },
  {
    title:
      'fix: include width param in Next.js Cloudflare Image loader examples to resolve warnings',
    repository: 'cloudflare/cloudflare-docs',
    number: 26391,
    url: 'https://github.com/cloudflare/cloudflare-docs/pull/26391',
    date: new Date('2025-11-08'),
    status: 'OPEN',
    type: 'PR'
  },
  {
    title: 'refactor(components): use canonical Tailwind class syntax',
    repository: 'shadcn-ui/ui',
    number: 8742,
    url: 'https://github.com/shadcn/ui/pull/8742',
    date: new Date('2025-11-08'),
    status: 'OPEN',
    type: 'PR'
  },
  {
    title: 'feat(th.json): add Thai language support',
    repository: 'anders94/blockchain-demo',
    number: 142,
    url: 'https://github.com/anders94/blockchain-demo/pull/142',
    date: new Date('2025-09-28'),
    status: 'OPEN',
    type: 'PR'
  }
];

export function getContributionsByYear(): Record<number, Contribution[]> {
  return contributionsData
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

export function getContributionStats() {
  return {
    total: contributionsData.length,
    merged: contributionsData.filter(c => c.status === 'MERGED').length,
    open: contributionsData.filter(c => c.status === 'OPEN').length,
    closed: contributionsData.filter(c => c.status === 'CLOSED').length
  };
}
