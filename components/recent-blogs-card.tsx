import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';
import { allBlogs } from 'content-collections';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

type BlogWithDate = (typeof allBlogs)[number] & {
  date: Date;
};

export function RecentBlogsCard() {
  const blogs = [...allBlogs]
    .sort((a, b) => (b as BlogWithDate).date.getTime() - (a as BlogWithDate).date.getTime())
    .slice(0, 4);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Recent Blogs
        </h2>
        <Link href="/blog" title="View all blogs" className="group/icon">
          <ArrowRightIcon
            className={cn(
              'text-foreground-muted transition-color size-5 transition-transform',
              'group-hover/icon:text-mirai-red'
            )}
            weight="regular"
          />
        </Link>
      </div>
      <ul className="divide-border-subtle space-y-3 divide-y" role="list">
        {blogs.map(blog => {
          const blog_ = blog as BlogWithDate;
          return (
            <li key={blog_.slug} className="group/item pb-3 first:pb-3">
              <Link href={`/blog/${blog_.slug}`} className="flex gap-3">
                {blog_.image && (
                  <div className="relative shrink-0 overflow-hidden rounded-lg">
                    <div className="relative mt-1 aspect-square h-20 overflow-hidden rounded-lg sm:aspect-video">
                      <Image
                        src={blog_.image}
                        alt={blog_.title}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </div>
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3
                    className={cn(
                      'text-foreground text-sm font-medium transition-colors',
                      'group-hover/item:text-mirai-red'
                    )}
                  >
                    {blog_.title}
                  </h3>
                  <p className="text-foreground-muted line-clamp-2 text-sm">{blog_.description}</p>
                  <time
                    className="text-foreground-muted text-xs"
                    dateTime={blog_.date.toISOString().split('T')[0]}
                  >
                    {blog_.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
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
