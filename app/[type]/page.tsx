import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import {
  contentConfig,
  getContentByYear,
  isValidContentType,
  type ContentType,
} from '@/lib/content-utils';
import { createMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/breadcrumb';

type PageProperties = {
  readonly params: Promise<{
    type: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { type } = await params;

  if (!isValidContentType(type)) return {};

  const config = contentConfig[type];

  return createMetadata({
    title: config.title,
    description: config.description,
  });
};

export const generateStaticParams = (): { type: ContentType }[] => [
  { type: 'project' },
  { type: 'blog' },
  { type: 'work' },
];

export default async function TypeListingPage({ params }: PageProperties) {
  const { type } = await params;

  if (!isValidContentType(type)) notFound();

  const config = contentConfig[type];
  const { title, description } = config;
  const contentByYear = getContentByYear(type);
  const hasContent = Object.keys(contentByYear).length > 0;

  // Helper function to format date range
  const formatDateRange = (post: {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
  }) => {
    if ('date' in post && post.date) {
      // Blog posts - single date with day
      return post.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } else if ('startDate' in post && post.startDate) {
      // Work and projects - date range without day
      const startDate = post.startDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });

      if ('endDate' in post && post.endDate) {
        const endDate = post.endDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
        return `${startDate} - ${endDate}`;
      } else {
        return `${startDate} - Present`;
      }
    }

    return '';
  };

  return (
    <>
      <Breadcrumb />
      <div className="gap-0">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-foreground-muted">{description}</p>
      </div>

      {!hasContent ? (
        <div className="mt-8 py-12 text-center">
          <p className="text-foreground-muted">No content available yet.</p>
        </div>
      ) : (
        Object.entries(contentByYear)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, posts]) => (
            <div
              key={year}
              className="divide-mirai-red mb-8 divide-y divide-dashed"
            >
              <h2 id={year} className="text-mirai-red mb-2 font-normal">
                <Link href={`#${year}`} className="hover:underline">
                  {year}
                </Link>
              </h2>
              <ul className="grid gap-6">
                {posts.map((post) => {
                  const isWork = 'position' in post;

                  return (
                    <li key={post._meta.path}>
                      <Link
                        href={`/${type}/${post.slug}`}
                        className="hover:text-mirai-red group flex items-center justify-between gap-2
                          transition-colors"
                      >
                        <div className="flex flex-col gap-1">
                          {isWork ? (
                            <>
                              <h3 className="text-lg font-semibold">
                                {post.position}
                              </h3>
                              <p className="text-foreground-lighter text-sm font-medium">
                                {post.company}
                              </p>
                              <p className="text-foreground-lighter text-sm">
                                {post.location}
                              </p>
                              <time className="text-foreground-lighter text-xs">
                                {formatDateRange(post)}
                              </time>
                            </>
                          ) : (
                            <>
                              <h3 className="text-lg font-semibold">
                                {post.title}
                              </h3>
                              <p className="text-foreground-lighter text-sm">
                                {post.description}
                              </p>
                              <time className="text-foreground-lighter text-xs">
                                {formatDateRange(post)}
                              </time>
                            </>
                          )}
                        </div>
                        <ChevronRight className="flex-shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
      )}
    </>
  );
}
