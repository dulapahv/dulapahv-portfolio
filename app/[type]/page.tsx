import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CaretRightIcon, LinkIcon } from '@phosphor-icons/react/dist/ssr';

import {
  contentConfig,
  getContentByYear,
  isValidContentType,
  type ContentType
} from '@/lib/content-utils';
import { collectionSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import Breadcrumb from '@/components/breadcrumb';
import { JsonLd } from '@/components/json-ld';

export const generateMetadata = async ({ params }: PageProps<'/[type]'>): Promise<Metadata> => {
  const { type } = await params;

  if (!isValidContentType(type)) return {};

  const config = contentConfig[type];

  return createMetadata({
    title: config.title,
    description: config.description
  });
};

export const generateStaticParams = (): { type: ContentType }[] => [
  { type: 'project' },
  { type: 'blog' }
];

export default async function TypeListingPage({ params }: PageProps<'/[type]'>) {
  const { type } = await params;

  if (!isValidContentType(type)) notFound();

  const config = contentConfig[type];
  const { title, description } = config;
  const contentByYear = getContentByYear(type);
  const hasContent = Object.keys(contentByYear).length > 0;

  // Helper function to format date range
  const formatDateRange = (post: { date?: Date; startDate?: Date; endDate?: Date }) => {
    if ('date' in post && post.date) {
      // Blog posts - single date with day
      return post.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } else if ('startDate' in post && post.startDate) {
      // Work and projects - date range without day
      const startDate = post.startDate.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });

      if ('endDate' in post && post.endDate) {
        const endDate = post.endDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });
        return `${startDate} - ${endDate}`;
      } else {
        return `${startDate} - Present`;
      }
    }

    return '';
  };

  // Helper function to get ISO date string for datetime attribute
  const getISODateString = (post: { date?: Date; startDate?: Date; endDate?: Date }) => {
    if ('date' in post && post.date) {
      return post.date.toISOString().split('T')[0];
    } else if ('startDate' in post && post.startDate) {
      return post.startDate.toISOString().split('T')[0];
    }
    return '';
  };

  return (
    <>
      <JsonLd schemas={[collectionSchema(type, { title, description })]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition default="slide">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="gap-0">
            <h1 className="text-lg font-medium">{title}</h1>
            <p className="text-foreground-muted">{description}</p>
          </header>

          {!hasContent ? (
            <section className="mt-8 py-12 text-center" aria-label="No content available">
              <p className="text-foreground-muted">No content available yet.</p>
            </section>
          ) : (
            <div role="main" aria-label={`${title} by year`}>
              {Object.entries(contentByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, posts]) => (
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
                    <ul className="grid gap-6" role="list" aria-label={`${type} from ${year}`}>
                      {posts.map(post => {
                        const dateTime = getISODateString(post);

                        return (
                          <li key={post._meta.path} role="listitem">
                            <Link
                              href={`/${type}/${post.slug}`}
                              className={cn(
                                'group -m-2 flex items-center justify-between gap-2 rounded-md p-2 transition-colors',
                                'hover:text-mirai-red'
                              )}
                              aria-label={`Read ${post.title}: ${post.description}`}
                            >
                              <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-foreground-lighter text-sm">
                                  {post.description}
                                </p>
                                <time
                                  className="text-foreground-lighter text-xs"
                                  dateTime={dateTime}
                                  aria-label={`Published on ${formatDateRange(post)}`}
                                >
                                  {formatDateRange(post)}
                                </time>
                              </div>
                              <CaretRightIcon
                                className={cn(
                                  'size-4.5 shrink-0 transition-transform',
                                  'group-hover:translate-x-1 group-focus:translate-x-1'
                                )}
                                aria-hidden="true"
                              />
                            </Link>
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
