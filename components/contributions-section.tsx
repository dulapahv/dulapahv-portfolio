import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import {
  CircleIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  LinkIcon,
  PencilSimpleIcon,
  XIcon
} from '@phosphor-icons/react/dist/ssr';

import {
  getContributions,
  getContributionsByYear,
  type ContributionStatus
} from '@/lib/contributions';
import { cn } from '@/lib/utils';

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

export async function ContributionsSection() {
  const contributions = await getContributions();
  const contributionsData = getContributionsByYear(contributions);

  return (
    <section className="mt-8" id="contributions">
      <h1 className="text-foreground mb-4 text-2xl font-semibold">
        <a
          href="#contributions"
          className={cn('group relative rounded-sm', 'hover:underline')}
          aria-label="Jump to Contributions section"
        >
          <LinkIcon
            className={cn(
              'absolute top-1/2 -left-6 size-4.5 -translate-y-1/2 opacity-0',
              'group-hover:opacity-100 group-focus:opacity-100'
            )}
            aria-hidden="true"
          />
          <span>Contributions</span>
        </a>
      </h1>

      {Object.entries(contributionsData)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([year, contributions]) => (
          <div key={year} className="divide-mirai-red mb-6 divide-y divide-dashed">
            <h2 id={year} className="text-mirai-red mb-2 font-normal">
              <a
                href={`#${year}`}
                className={cn('group relative rounded-sm underline-offset-2', 'hover:underline')}
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
            <ul className="space-y-3">
              {contributions.map(contribution => {
                const statusConfig = getStatusConfig(contribution.status);
                const TypeIcon = contribution.type === 'PR' ? GitPullRequestIcon : CircleIcon;

                return (
                  <li key={contribution.url} className="group">
                    <a
                      href={contribution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn('-mx-2 flex flex-col gap-1.5 rounded-md p-2')}
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
                          <span className="text-foreground group-hover:text-mirai-red font-medium wrap-break-word transition-colors">
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
                            <statusConfig.icon className="size-3.5" aria-hidden={true} />
                          )}
                          {statusConfig.label}
                        </span>
                      </div>
                      <div
                        className="text-foreground-lighter group-hover:text-mirai-red ml-6 flex flex-wrap items-center gap-2 text-xs
                          transition-colors"
                      >
                        <span className="font-mono">{contribution.repository}</span>
                        <span aria-hidden="true">•</span>
                        <span className="font-mono">#{contribution.url.split('/').pop()}</span>
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
          </div>
        ))}
    </section>
  );
}
