import Link from 'next/link';

import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import {
  ArrowUpRightIcon,
  CircleIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  PencilSimpleIcon,
  XIcon
} from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';
import { Card } from '@/components/Card';
import {
  getContributions,
  getContributionStats,
  type ContributionStatus
} from '@/app/actions/GhOssContributions';

function getStatusConfig(status: ContributionStatus): {
  label: string;
  className: string;
  icon?: Icon;
} {
  switch (status) {
    case 'MERGED':
      return {
        label: 'Merged',
        className: 'bg-purple-100 text-purple-900',
        icon: GitMergeIcon
      };
    case 'OPEN':
      return {
        label: 'Open',
        className: 'bg-green-100 text-green-900',
        icon: GitPullRequestIcon
      };
    case 'CLOSED':
      return {
        label: 'Closed',
        className: 'bg-red-100 text-red-900',
        icon: XIcon
      };
    case 'DRAFT':
      return {
        label: 'Draft',
        className: 'bg-gray-100 text-gray-900',
        icon: PencilSimpleIcon
      };
  }
}

export async function OpenSourceCard() {
  const contributions = await getContributions();
  const stats = await getContributionStats(contributions);

  // Get recent contributions (limit to 5)
  const recentContributions = contributions
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Open Source Contributions
        </h2>
        <Link
          href="https://github.com/dulapahv"
          target="_blank"
          rel="noopener noreferrer"
          title="View my GitHub profile"
          className="group/icon"
        >
          <ArrowUpRightIcon
            className={cn(
              'text-foreground-muted transition-color size-5',
              'group-hover/icon:text-mirai-red'
            )}
            weight="regular"
          />
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
        <div className="text-foreground flex items-baseline gap-1.5 text-sm">
          <span className="font-semibold">{stats.total}</span>
          <span className="text-foreground-muted text-xs">total</span>
        </div>
        <div className="text-foreground flex items-baseline gap-1.5 text-sm">
          <span className="font-semibold text-purple-900">{stats.merged}</span>
          <span className="text-foreground-muted text-xs">merged</span>
        </div>
        <div className="text-foreground flex items-baseline gap-1.5 text-sm">
          <span className="font-semibold text-green-900">{stats.open}</span>
          <span className="text-foreground-muted text-xs">open</span>
        </div>
      </div>

      <ul className="divide-border-subtle space-y-3 divide-y" role="list">
        {recentContributions.map(contribution => {
          const statusConfig = getStatusConfig(contribution.status);
          const TypeIcon = contribution.type === 'PR' ? GitPullRequestIcon : CircleIcon;

          return (
            <li key={contribution.url} className="group pb-3 first:pb-3">
              <a
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    <TypeIcon
                      className={cn(
                        'mt-0.5 size-5 shrink-0',
                        contribution.type === 'PR' ? 'text-purple-600' : 'text-green-600'
                      )}
                      aria-label={contribution.type === 'PR' ? 'Pull Request' : 'Issue'}
                    />
                    <span
                      className={cn(
                        'text-foreground text-sm font-medium wrap-break-word transition-colors',
                        'group-hover:text-mirai-red'
                      )}
                    >
                      {contribution.title}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                      statusConfig.className
                    )}
                    aria-label={`Status: ${statusConfig.label}`}
                  >
                    {statusConfig.icon && (
                      <statusConfig.icon className="size-3" aria-hidden={true} />
                    )}
                    {statusConfig.label}
                  </span>
                </div>
                <div className="text-foreground-muted ml-6 flex flex-wrap items-center gap-2 text-xs transition-colors">
                  <span className="font-mono break-all">{contribution.repository}</span>
                  <span aria-hidden="true">•</span>
                  <span className="font-mono">#{contribution.number}</span>
                  <span aria-hidden="true">•</span>
                  <time
                    dateTime={contribution.date.toISOString().split('T')[0]}
                    aria-label={`Date: ${contribution.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}`}
                  >
                    {contribution.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {contributions.length === 0 && (
        <p className="text-foreground-muted text-sm">No contributions found</p>
      )}
    </Card>
  );
}
