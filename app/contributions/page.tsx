import { ViewTransition } from 'react';
import type { Metadata } from 'next';

import { Circle, GitMerge, GitPullRequest, LinkIcon } from '@phosphor-icons/react/dist/ssr';

import {
  getContributionsByYear,
  getContributionStats,
  type ContributionStatus
} from '@/lib/contributions';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import Breadcrumb from '@/components/breadcrumb';

export const metadata: Metadata = createMetadata({
  title: 'Contributions',
  description: 'Open source contributions and community involvement.'
});

const getStatusConfig = (
  status: ContributionStatus
): {
  label: string;
  className: string;
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
} => {
  switch (status) {
    case 'MERGED':
      return {
        label: 'Merged',
        className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        icon: GitMerge
      };
    case 'OPEN':
      return {
        label: 'Open',
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        icon: GitPullRequest
      };
    case 'CLOSED':
      return {
        label: 'Closed',
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      };
    case 'DRAFT':
      return {
        label: 'Draft',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      };
  }
};

export default function ContributionsPage() {
  const contributionsByYear = getContributionsByYear();
  const stats = getContributionStats();
  const hasContributions = Object.keys(contributionsByYear).length > 0;

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-4">
        <Breadcrumb lastLabel="Contributions" />
      </div>
      <ViewTransition default="slide">
        <main className="mx-auto max-w-2xl space-y-4">
          <header className="gap-0">
            <h1 className="text-lg font-medium">Contributions</h1>
            <p className="text-foreground-muted">
              Open source contributions and community involvement.
            </p>
            {hasContributions && (
              <div className="text-foreground-muted mt-3 flex flex-wrap gap-3 text-sm">
                <span>
                  <strong className="text-foreground font-semibold">{stats.total}</strong> total
                </span>
                <span aria-hidden="true">•</span>
                <span>
                  <strong className="text-foreground font-semibold">{stats.merged}</strong> merged
                </span>
                <span aria-hidden="true">•</span>
                <span>
                  <strong className="text-foreground font-semibold">{stats.open}</strong> open
                </span>
              </div>
            )}
          </header>

          {!hasContributions ? (
            <section className="mt-8 py-12 text-center" aria-label="No contributions available">
              <p className="text-foreground-muted">No contributions available yet.</p>
            </section>
          ) : (
            <div role="main" aria-label="Contributions by year">
              {Object.entries(contributionsByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, contributions]) => (
                  <section
                    key={year}
                    className="divide-mirai-red mb-8 divide-y divide-dashed"
                    aria-labelledby={year}
                  >
                    <h2 id={year} className="text-mirai-red mb-2 font-normal">
                      <a
                        href={`#${year}`}
                        className={cn(
                          'group relative rounded-sm underline-offset-2',
                          'hover:underline'
                        )}
                        aria-label={`Jump to ${year} section`}
                      >
                        <LinkIcon
                          className={cn(
                            'absolute top-1/2 -left-4.5 size-3.5 -translate-y-1/2 opacity-0',
                            'group-hover:opacity-100 group-focus:opacity-100'
                          )}
                          aria-hidden="true"
                        />
                        <span>{year}</span>
                      </a>
                    </h2>
                    <ul
                      className="grid gap-4 pt-4"
                      role="list"
                      aria-label={`Contributions from ${year}`}
                    >
                      {contributions.map(contribution => {
                        const statusConfig = getStatusConfig(contribution.status);
                        const TypeIcon = contribution.type === 'PR' ? GitPullRequest : Circle;

                        return (
                          <li key={contribution.url} role="listitem">
                            <a
                              href={contribution.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                'group -m-2 flex flex-col gap-2 rounded-md p-2 transition-colors',
                                'hover:bg-background-subtle'
                              )}
                              aria-label={`${contribution.type === 'PR' ? 'Pull Request' : 'Issue'} #${contribution.number} in ${contribution.repository}: ${contribution.title}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex min-w-0 flex-1 items-start gap-2">
                                  <TypeIcon
                                    className={cn(
                                      'mt-0.5 size-5 shrink-0',
                                      contribution.type === 'PR'
                                        ? 'text-purple-600 dark:text-purple-400'
                                        : 'text-green-600 dark:text-green-400'
                                    )}
                                    aria-label={
                                      contribution.type === 'PR' ? 'Pull Request' : 'Issue'
                                    }
                                  />
                                  <div className="min-w-0 flex-1">
                                    <h3 className="text-foreground group-hover:text-mirai-red text-base font-semibold break-words transition-colors">
                                      {contribution.title}
                                    </h3>
                                  </div>
                                </div>
                                <span
                                  className={cn(
                                    'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
                                    statusConfig.className
                                  )}
                                  aria-label={`Status: ${statusConfig.label}`}
                                >
                                  {statusConfig.icon && (
                                    <statusConfig.icon className="size-3.5" aria-hidden={true} />
                                  )}
                                  {statusConfig.label}
                                </span>
                              </div>
                              <div className="text-foreground-lighter ml-7 flex flex-wrap items-center gap-2 text-sm">
                                <span className="font-mono text-xs">{contribution.repository}</span>
                                <span aria-hidden="true">•</span>
                                <span className="font-mono text-xs">#{contribution.number}</span>
                                <span aria-hidden="true">•</span>
                                <time
                                  dateTime={contribution.date.toISOString().split('T')[0]}
                                  className="text-xs"
                                  aria-label={`Date: ${contribution.date.toLocaleDateString(
                                    'en-US',
                                    {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    }
                                  )}`}
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
                  </section>
                ))}
            </div>
          )}
        </main>
      </ViewTransition>
    </>
  );
}
