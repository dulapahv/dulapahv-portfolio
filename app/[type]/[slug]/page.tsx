import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import {
  contentConfig,
  getCollection,
  isValidContentType,
  type ContentType,
} from '@/lib/content-utils';
import { createMetadata } from '@/lib/metadata';
import { Mdx } from '@/components/mdx';

type PageProperties = {
  readonly params: Promise<{
    type: string;
    slug: string;
  }>;
};

// Helper function to get the relevant date from content
const getContentDate = (page: { date?: Date; startDate?: Date }): Date => {
  return page.date ?? page.startDate ?? new Date();
};

export const generateMetadata = async ({
  params,
}: PageProperties): Promise<Metadata> => {
  const { type, slug } = await params;

  if (!isValidContentType(type)) return {};

  const collection = getCollection(type);
  const page = collection.find((page) => page._meta.path === slug);

  if (!page) return {};

  // Generate appropriate title and description based on content type
  let title: string;
  let description: string;

  if ('position' in page) {
    // Work item
    title = `${page.position} at ${page.company}`;
    description = `${page.position} role at ${page.company} in ${page.location}`;
  } else {
    // Project or blog
    title = page.title;
    description = page.description;
  }

  return createMetadata({
    title,
    description,
  });
};

export const generateStaticParams = (): { type: string; slug: string }[] => {
  const types: ContentType[] = ['project', 'blog', 'work'];

  return types.flatMap((type) =>
    getCollection(type).map((page) => ({
      type,
      slug: page._meta.path,
    })),
  );
};

export default async function ContentPage({ params }: PageProperties) {
  const { type, slug } = await params;

  if (!isValidContentType(type)) notFound();

  const collection = getCollection(type);
  const page = collection.find((page) => page._meta.path === slug);

  if (!page) notFound();

  const { label } = contentConfig[type];

  // Check content type and format accordingly
  const isWork = 'position' in page;
  const isProject = 'startDate' in page && 'title' in page;
  const isBlog = 'date' in page;

  // Format title based on content type
  let title: string;
  let subtitle: string | undefined;
  let dateInfo: string;

  if (isWork) {
    title = page.position;
    subtitle = `${page.company} | ${page.location}`;
    const startDate = page.startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const endDate = page.endDate
      ? page.endDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Present';
    dateInfo = `${startDate} - ${endDate}`;
  } else if (isProject) {
    title = page.title;
    subtitle = page.description;
    const startDate = page.startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const endDate = page.endDate
      ? page.endDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Ongoing';
    dateInfo = `${startDate} - ${endDate}`;
  } else {
    // Blog
    title = page.title;
    subtitle = page.description;
    dateInfo = page.date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <>
      <header className="space-y-2">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-foreground-muted font-medium">{subtitle}</p>
          )}
        </div>
        <div className="text-foreground-muted space-y-1 text-sm">
          <p>
            <span className="sr-only">Type:</span>
            <span className="mr-2 inline-block">{label}</span>
            <span aria-hidden="true">|</span>
            <span className="ml-2">
              {isBlog ? 'Published on' : 'Duration:'}{' '}
              <time dateTime={getContentDate(page).toISOString()}>
                {dateInfo}
              </time>
            </span>
          </p>
          <p>{page.readingTime}</p>
        </div>
      </header>
      {page.image ? (
        <div className="relative">
          <Image
            src={page.image}
            alt={`Cover image for ${title}`}
            width={1200}
            height={630}
            className="border-border/50 overflow-hidden rounded-md border"
            quality={100}
            priority
          />
        </div>
      ) : null}

      <article>
        <Mdx code={page.body} />
      </article>
    </>
  );
}
