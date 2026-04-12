import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Link } from "@/components/link";
import { allBlogs } from "@/lib/content-utils/content-utils";
import { formatShortDate, toISODate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { CardHeader, CardHeaderIconLink } from "./card-header";

const RECENT_BLOGS = [...allBlogs]
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 4);

export function RecentBlogsCard() {
  return (
    <Card className="p-5">
      <CardHeader
        action={
          <CardHeaderIconLink
            href="/blog"
            icon={ArrowRightIcon}
            title="View all blogs"
          />
        }
        title="Recent Blogs"
      />
      <ul className="space-y-3 divide-y divide-border-subtle">
        {RECENT_BLOGS.map((blog) => (
          <li className="group/item pb-3 first:pb-3" key={blog.slug}>
            <Link className="flex gap-3" href={`/blog/${blog.slug}`}>
              {blog.image ? (
                <div className="relative shrink-0 overflow-hidden rounded-lg">
                  <div className="relative mt-1 aspect-square h-20 overflow-hidden rounded-lg sm:aspect-video">
                    <Image
                      alt={blog.title}
                      className="object-cover"
                      fill
                      quality={1}
                      sizes="150px"
                      src={blog.image}
                    />
                  </div>
                </div>
              ) : null}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3
                  className={cn(
                    "font-medium text-foreground text-sm",
                    "group-hover/item:text-mirai-red"
                  )}
                >
                  {blog.title}
                </h3>
                <p className="line-clamp-2 text-foreground-muted text-sm">
                  {blog.description}
                </p>
                <time
                  className="text-foreground-muted text-xs"
                  dateTime={toISODate(blog.date)}
                >
                  {formatShortDate(blog.date)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
