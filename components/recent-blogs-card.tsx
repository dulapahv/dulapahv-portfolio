import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { allBlogs } from "content-collections";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/card";
import { cn } from "@/lib/utils";

type BlogWithDate = (typeof allBlogs)[number] & {
  date: Date;
};

export function RecentBlogsCard() {
  const blogs = [...allBlogs]
    .sort(
      (a, b) =>
        (b as BlogWithDate).date.getTime() - (a as BlogWithDate).date.getTime()
    )
    .slice(0, 4);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
          Recent Blogs
        </h2>
        <Link className="group/icon" href="/blog" title="View all blogs">
          <ArrowRightIcon
            className={cn(
              "size-5 text-foreground-muted transition-color transition-transform",
              "group-hover/icon:text-mirai-red"
            )}
            weight="regular"
          />
        </Link>
      </div>
      <ul className="space-y-3 divide-y divide-border-subtle">
        {blogs.map((blog) => {
          const blog_ = blog as BlogWithDate;
          return (
            <li className="group/item pb-3 first:pb-3" key={blog_.slug}>
              <Link className="flex gap-3" href={`/blog/${blog_.slug}`}>
                {blog_.image && (
                  <div className="relative shrink-0 overflow-hidden rounded-lg">
                    <div className="relative mt-1 aspect-square h-20 overflow-hidden rounded-lg sm:aspect-video">
                      <Image
                        alt={blog_.title}
                        className="object-cover"
                        fill
                        quality={1}
                        sizes="150px"
                        src={blog_.image}
                      />
                    </div>
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3
                    className={cn(
                      "font-medium text-foreground text-sm transition-colors",
                      "group-hover/item:text-mirai-red"
                    )}
                  >
                    {blog_.title}
                  </h3>
                  <p className="line-clamp-2 text-foreground-muted text-sm">
                    {blog_.description}
                  </p>
                  <time
                    className="text-foreground-muted text-xs"
                    dateTime={blog_.date.toISOString().split("T")[0]}
                  >
                    {blog_.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
