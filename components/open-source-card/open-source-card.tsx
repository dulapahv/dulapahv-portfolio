import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import {
  CheckCircleIcon,
  CircleIcon,
  GitMergeIcon,
  GitPullRequestIcon,
  PencilSimpleIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  getContributionStats,
  getContributions,
} from "@/app/actions/gh-oss-contributions";
import { Card } from "@/components/card";
import { CardHeader, CardHeaderIconLink } from "@/components/card-header";
import { Link } from "@/components/link";
import { GITHUB_URL } from "@/lib/constants";
import type { ContributionStatus } from "@/lib/contributions";
import { formatShortDate, toISODate } from "@/lib/date";
import { cn } from "@/lib/utils";

function getStatusConfig(
  status: ContributionStatus,
  type: "PR" | "ISSUE"
): {
  label: string;
  className: string;
  icon?: Icon;
} {
  switch (status) {
    case "MERGED":
      return {
        label: "Merged",
        className: "bg-purple-100 text-purple-900",
        icon: GitMergeIcon,
      };
    case "OPEN":
      return {
        label: "Open",
        className: "bg-green-100 text-green-900",
        icon: GitPullRequestIcon,
      };
    case "CLOSED":
      return type === "ISSUE"
        ? {
            label: "Closed",
            className: "bg-purple-100 text-purple-900",
            icon: CheckCircleIcon,
          }
        : {
            label: "Closed",
            className: "bg-red-100 text-red-900",
            icon: XIcon,
          };
    case "DRAFT":
      return {
        label: "Draft",
        className: "bg-gray-100 text-gray-900",
        icon: PencilSimpleIcon,
      };
    default:
      throw new Error(`Unknown contribution status: ${status}`);
  }
}

export async function OpenSourceCard() {
  const contributions = await getContributions();
  const stats = await getContributionStats(contributions);

  const recentContributions = contributions
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <Card className="p-5">
      <CardHeader
        action={
          <CardHeaderIconLink
            href={GITHUB_URL}
            title="View my GitHub profile"
          />
        }
        title="Open Source Contributions"
      />

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-1.5 text-foreground text-sm">
          <span className="font-semibold">{stats.total}</span>
          <span className="text-foreground-muted text-xs">total</span>
        </div>

        <div className="flex items-baseline gap-1.5 text-foreground text-sm">
          <span className="font-semibold text-purple-900">{stats.merged}</span>
          <span className="text-foreground-muted text-xs">merged</span>
        </div>

        <div className="flex items-baseline gap-1.5 text-foreground text-sm">
          <span className="font-semibold text-green-900">{stats.open}</span>
          <span className="text-foreground-muted text-xs">open</span>
        </div>
      </div>

      <ul className="space-y-3 divide-y divide-border-subtle">
        {recentContributions.map((contribution) => {
          const statusConfig = getStatusConfig(
            contribution.status,
            contribution.type
          );
          const TypeIcon =
            contribution.type === "PR" ? GitPullRequestIcon : CircleIcon;

          return (
            <li className="group pb-3 first:pb-3" key={contribution.url}>
              <Link className="flex flex-col gap-1.5" href={contribution.url}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 items-start gap-2">
                    <TypeIcon
                      aria-label={
                        contribution.type === "PR" ? "Pull Request" : "Issue"
                      }
                      className={cn(
                        "mt-0.5 size-5 shrink-0",
                        contribution.type === "PR"
                          ? "text-purple-600"
                          : "text-green-600"
                      )}
                    />
                    <span
                      className={cn(
                        "wrap-break-word font-medium text-foreground text-sm",
                        "group-hover:text-mirai-red"
                      )}
                    >
                      {contribution.title}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-medium text-xs",
                      statusConfig.className
                    )}
                  >
                    {statusConfig.icon ? (
                      <statusConfig.icon
                        aria-hidden={true}
                        className="size-3"
                      />
                    ) : null}
                    {statusConfig.label}
                  </span>
                </div>

                <div className="ml-7 flex flex-wrap items-center gap-2 text-foreground-muted text-xs">
                  <span className="break-all font-mono">
                    {contribution.repository}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span className="font-mono">#{contribution.number}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={toISODate(contribution.date)}>
                    {formatShortDate(contribution.date)}
                  </time>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {contributions.length === 0 ? (
        <p className="text-foreground-muted text-sm">No contributions found</p>
      ) : null}
    </Card>
  );
}
