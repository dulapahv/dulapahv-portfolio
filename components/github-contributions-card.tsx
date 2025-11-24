import Link from 'next/link';

import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';
import { getContributionStats, getGitHubContributions } from '@/app/actions/GhContributions';

interface GitHubContributionsCardProps {
  username: string;
}

function getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = {
    0: 'bg-gray-200',
    1: 'bg-green-300',
    2: 'bg-green-500',
    3: 'bg-green-600',
    4: 'bg-green-900'
  };
  return colors[level];
}

export async function GitHubContributionsCard({ username }: GitHubContributionsCardProps) {
  const weeks = await getGitHubContributions(username);
  const stats = await getContributionStats(username);

  // Get last 52 weeks (1 year)
  const last52Weeks = weeks.slice(-52);

  // Month labels
  const getMonthLabel = (weekIndex: number) => {
    if (weekIndex >= last52Weeks.length) return null;
    const week = last52Weeks[weekIndex];

    // Find the first non-null day in the week
    const firstDay = week.days.find(d => d !== null);
    if (!firstDay) return null;

    const date = new Date(firstDay.date);
    const isFirstWeekOfMonth = date.getDate() <= 7;

    if (isFirstWeekOfMonth) {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
    return null;
  };

  return (
    <Link
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      title="View my GitHub profile"
      className="group block h-full"
    >
      <Card className="flex h-full flex-col p-5">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
            GitHub Activity
          </h2>
          <ArrowUpRightIcon
            className={cn(
              'text-foreground-muted size-5 transition-colors',
              'group-hover:text-mirai-red'
            )}
            weight="regular"
          />
        </div>

        <div className="mb-4">
          <div className="text-foreground text-sm">
            <span className="font-semibold">{stats.totalContributions.toLocaleString()}</span>
            <span className="text-foreground-muted ml-1">contributions in {stats.currentYear}</span>
          </div>
        </div>

        <div className="flex justify-center overflow-x-auto">
          <div className="inline-flex flex-col gap-1">
            <div className="flex gap-[3px] pl-6">
              {last52Weeks.map((_, weekIndex) => {
                const label = getMonthLabel(weekIndex);
                return (
                  <div key={weekIndex} className="w-2.5">
                    {label && <span className="text-foreground-muted text-xs">{label}</span>}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-[3px]">
              <div className="flex flex-col gap-px">
                <div className="h-2" />
                <span className="text-foreground-muted text-xs">Mon</span>
                <div className="h-2" />
                <span className="text-foreground-muted text-xs">Wed</span>
                <div className="h-2" />
                <span className="text-foreground-muted text-xs">Fri</span>
                <div className="h-2" />
              </div>

              {last52Weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const day = week.days[dayIndex];
                    if (!day) {
                      return <div key={dayIndex} className="h-2.5 w-2.5" />;
                    }

                    return (
                      <div
                        key={dayIndex}
                        className={cn(
                          'h-2.5 w-2.5 rounded-sm transition-colors',
                          getContributionColor(day.level)
                        )}
                        title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-foreground-muted text-xs">Less</span>
              <div className="flex gap-1">
                {([0, 1, 2, 3, 4] as const).map(level => (
                  <div
                    key={level}
                    className={cn('h-2.5 w-2.5 rounded-sm', getContributionColor(level))}
                  />
                ))}
              </div>
              <span className="text-foreground-muted text-xs">More</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
