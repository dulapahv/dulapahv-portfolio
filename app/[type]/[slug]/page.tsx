import { ViewTransition } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Zoom from 'react-medium-image-zoom';

import {
  contentConfig,
  getCollection,
  isValidContentType,
  type ContentType
} from '@/lib/content-utils';
import { createBlogPostingSchema, createProjectSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/breadcrumb';
import { JsonLd } from '@/components/json-ld';
import { Mdx } from '@/components/mdx';
import { ShareButtons } from '@/components/Share';
import { TableOfContents } from '@/components/Toc';

// Helper function to get the relevant date from content
const getContentDate = (page: { date?: Date; startDate?: Date }): Date => {
  return page.date ?? page.startDate ?? new Date();
};

// Helper function to get ISO date string for datetime attribute
const getISODateString = (page: { date?: Date; startDate?: Date; endDate?: Date }): string => {
  const primaryDate = getContentDate(page);
  return primaryDate.toISOString().split('T')[0];
};

// Helper function to get date range ISO string for work/projects
const getDateRangeISO = (startDate: Date, endDate?: Date): string => {
  const start = startDate.toISOString().split('T')[0];
  const end = endDate ? endDate.toISOString().split('T')[0] : '';
  return end ? `${start}/${end}` : start;
};

export const generateMetadata = async ({
  params
}: PageProps<'/[type]/[slug]'>): Promise<Metadata> => {
  const { type, slug } = await params;

  if (!isValidContentType(type)) return {};

  const collection = getCollection(type);
  const page = collection.find(page => page._meta.path === slug);

  if (!page) return {};

  // Generate appropriate title and description based on content type
  let title: string;
  let description: string;

  if ('startDate' in page && 'title' in page) {
    // Project
    title = page.title;
    description = page.description;
  } else {
    // Blog
    title = page.title;
    description = page.description;
  }

  return createMetadata({
    title,
    description
  });
};

export const generateStaticParams = (): { type: string; slug: string }[] => {
  const types: ContentType[] = ['project', 'blog'];

  return types.flatMap(type =>
    getCollection(type).map(page => ({
      type,
      slug: page._meta.path
    }))
  );
};

export default async function ContentPage({ params }: PageProps<'/[type]/[slug]'>) {
  const { type, slug } = await params;

  if (!isValidContentType(type)) notFound();

  const collection = getCollection(type);
  const page = collection.find(page => page._meta.path === slug);

  if (!page) notFound();

  const { label } = contentConfig[type];

  // Check content type and format accordingly
  const isProject = 'startDate' in page && 'title' in page;
  const isBlog = 'date' in page;

  // Format title based on content type
  let title: string;
  let subtitle: string | undefined;
  let dateInfo: string;
  let dateTimeValue: string;
  let dateLabel: string;
  let pageSchema;

  if (isProject) {
    title = page.title;
    subtitle = page.description;
    const startDate = page.startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const endDate = page.endDate
      ? page.endDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      : 'Ongoing';
    dateInfo = `${startDate} - ${endDate}`;
    dateTimeValue = getDateRangeISO(page.startDate, page.endDate);
    dateLabel = `Project duration from ${startDate} to ${endDate}`;
    pageSchema = createProjectSchema({
      title: page.title,
      description: page.description,
      startDate: page.startDate,
      endDate: page.endDate,
      slug: page.slug,
      image: page.image
    });
  } else {
    // Blog
    title = page.title;
    subtitle = page.description;
    dateInfo = page.date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    dateTimeValue = getISODateString(page);
    dateLabel = `Published on ${dateInfo}`;
    pageSchema = createBlogPostingSchema({
      title: page.title,
      description: page.description,
      date: page.date,
      slug: page.slug,
      readingTime: page.readingTime,
      image: page.image
    });
  }

  // Generate comprehensive alt text for images
  const generateImageAlt = (): string => {
    if (isProject) {
      return `Cover image for ${page.title} project`;
    } else {
      return `Cover image for blog post: ${page.title}`;
    }
  };

  return (
    <>
      <JsonLd schemas={[pageSchema]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition default="slide">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="space-y-2">
            <div>
              <h1 className="text-2xl font-semibold">{title}</h1>
              {subtitle && (
                <p className="text-foreground-muted font-medium" role="doc-subtitle">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="text-foreground-muted space-y-1 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sr-only">Content type:</span>
                <span className="inline-block font-medium" aria-label={`Content type: ${label}`}>
                  {label}
                </span>
                <span aria-hidden="true" className="text-foreground-subtle">
                  |
                </span>
                <div className="flex gap-1">
                  <span className="sr-only">{isBlog ? 'Publication date:' : 'Duration:'}</span>
                  <span aria-hidden="true">{isBlog ? 'Published on' : 'Duration:'}</span>
                  <time dateTime={dateTimeValue} aria-label={dateLabel} className="font-medium">
                    {dateInfo}
                  </time>
                </div>
              </div>
              {page.readingTime && (
                <p aria-label={`Estimated reading time: ${page.readingTime}`}>
                  <span className="sr-only">Reading time:</span>
                  {page.readingTime}
                </p>
              )}
            </div>
            <ShareButtons
              page={{
                title: title,
                description: subtitle,
                content: page.content,
                type: type
              }}
            />
          </header>
          <TableOfContents />
          {page.image && (
            <figure className="relative" role="img" aria-labelledby="cover-image-caption">
              <Zoom
                zoomMargin={12}
                wrapElement="span"
                classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
              >
                <Image
                  src={page.image}
                  alt={generateImageAlt()}
                  width={1200}
                  height={630}
                  className="border-border bg-background-muted/30 overflow-hidden rounded-md border"
                  quality={100}
                  priority
                />
              </Zoom>
              <figcaption id="cover-image-caption" className="sr-only">
                {generateImageAlt()}
              </figcaption>
            </figure>
          )}
          <Mdx code={page.body} />
        </main>
      </ViewTransition>
    </>
  );
}
