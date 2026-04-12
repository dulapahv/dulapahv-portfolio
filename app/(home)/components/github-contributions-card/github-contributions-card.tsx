import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getGitHubContributionsData } from "@/app/actions/gh-contributions";
import { Link } from "@/components/link";
import { formatMonth } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Card } from "../card";
import { CardHeader } from "../card-header";

interface GitHubContributionsCardProps {
  username: string;
}

function getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = {
    0: "bg-gray-200",
    1: "bg-green-300",
    2: "bg-green-500",
    3: "bg-green-600",
    4: "bg-green-900",
  };
  return colors[level];
}

export async function GitHubContributionsCard({
  username,
}: GitHubContributionsCardProps) {
  const { weeks, totalContributions, currentYear } =
    await getGitHubContributionsData(username);

  const last52Weeks = weeks.slice(-52);

  const getMonthLabel = (weekIndex: number) => {
    if (weekIndex >= last52Weeks.length) {
      return null;
    }

    const week = last52Weeks[weekIndex];
    const firstDay = week.days.find((d) => d !== null);
    if (!firstDay) {
      return null;
    }

    const date = new Date(firstDay.date);
    if (date.getDate() <= 7) {
      return formatMonth(date);
    }

    return null;
  };

  return (
    <Link
      className="group block h-full"
      href={`https://github.com/${username}`}
      title="View my GitHub profile"
    >
      <Card className="flex h-full flex-col p-5">
        <CardHeader
          action={
            <ArrowUpRightIcon
              className="size-5 text-foreground-muted transition-colors group-hover:text-mirai-red"
              weight="regular"
            />
          }
          title="GitHub Activity"
        />

        <div className="mb-4 text-foreground text-sm">
          <span className="font-semibold">
            {totalContributions.toLocaleString()}
          </span>
          <span className="ml-1 text-foreground-muted">
            contributions in {currentYear}
          </span>
        </div>

        <div className="flex justify-center overflow-x-auto">
          <div className="inline-flex cursor-crosshair flex-col gap-1">
            <div className="flex gap-0.75 pl-6">
              {last52Weeks.map((week, weekIndex) => {
                const label = getMonthLabel(weekIndex);
                return (
                  <div
                    className="w-2.5"
                    key={`month-label-${week.days[0]?.date || weekIndex}`}
                  >
                    {label ? (
                      <span className="text-foreground-muted text-xs">
                        {label}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-0.75">
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
                <div
                  className="flex flex-col gap-0.75"
                  key={`week-${week.days[0]?.date || weekIndex}`}
                >
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const day = week.days[dayIndex];
                    if (!day) {
                      return (
                        <div
                          className="size-2.5"
                          key={`empty-${week.days[0]?.date || weekIndex}-${dayIndex}`}
                        />
                      );
                    }

                    return (
                      <div
                        className={cn(
                          "size-2.5 rounded-sm",
                          getContributionColor(day.level)
                        )}
                        key={`day-${day.date}`}
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
                {([0, 1, 2, 3, 4] as const).map((level) => (
                  <div
                    className={cn(
                      "size-2.5 rounded-sm",
                      getContributionColor(level)
                    )}
                    key={level}
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
