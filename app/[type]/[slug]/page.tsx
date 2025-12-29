import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Zoom from "react-medium-image-zoom";
import type { BlogPosting, CreativeWork, WithContext } from "schema-dts";
import Breadcrumb from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { Mdx } from "@/components/mdx";
import { ShareButtons } from "@/components/share/share";
import { TableOfContents } from "@/components/toc/toc";
import {
  type ContentType,
  contentConfig,
  getCollection,
  isValidContentType,
} from "@/lib/content-utils/content-utils";
import { createBlogPostingSchema, createProjectSchema } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

// Helper function to get the relevant date from content
const getContentDate = (page: { date?: Date; startDate?: Date }): Date => {
  return page.date ?? page.startDate ?? new Date();
};

// Helper function to get ISO date string for datetime attribute
const getISODateString = (page: {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}): string => {
  const primaryDate = getContentDate(page);
  return primaryDate.toISOString().split("T")[0];
};

// Helper function to get date range ISO string for work/projects
const getDateRangeISO = (startDate: Date, endDate?: Date): string => {
  const start = startDate.toISOString().split("T")[0];
  const end = endDate ? endDate.toISOString().split("T")[0] : "";
  return end ? `${start}/${end}` : start;
};

export const generateMetadata = async ({
  params,
}: PageProps<"/[type]/[slug]">): Promise<Metadata> => {
  const { type, slug } = await params;

  if (!isValidContentType(type)) {
    return {};
  }

  const collection = getCollection(type);
  const page = collection.find((page) => page._meta.path === slug);

  if (!page) {
    return {};
  }

  // Generate appropriate title and description based on content type
  let title: string;
  let description: string;

  if ("startDate" in page && "title" in page) {
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
    description,
  });
};

export const generateStaticParams = (): { type: string; slug: string }[] => {
  const types: ContentType[] = ["project", "blog"];

  return types.flatMap((type) =>
    getCollection(type).map((page) => ({
      type,
      slug: page._meta.path,
    }))
  );
};

export default async function ContentPage({
  params,
}: PageProps<"/[type]/[slug]">) {
  const { type, slug } = await params;

  if (!isValidContentType(type)) {
    notFound();
  }

  const collection = getCollection(type);
  const page = collection.find((page) => page._meta.path === slug);

  if (!page) {
    notFound();
  }

  const { label } = contentConfig[type];

  // Check content type and format accordingly
  const isProject = "startDate" in page && "title" in page;
  const isBlog = "date" in page;

  // Format title based on content type
  let title: string;
  let subtitle: string | undefined;
  let dateInfo: string;
  let dateTimeValue: string;
  let _dateLabel: string;
  let pageSchema: WithContext<BlogPosting> | WithContext<CreativeWork>;

  if (isProject) {
    title = page.title;
    subtitle = page.description;
    const startDate = page.startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const endDate = page.endDate
      ? page.endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Ongoing";
    dateInfo = `${startDate} - ${endDate}`;
    dateTimeValue = getDateRangeISO(page.startDate, page.endDate);
    _dateLabel = `Project duration from ${startDate} to ${endDate}`;
    pageSchema = createProjectSchema({
      title: page.title,
      description: page.description,
      startDate: page.startDate,
      endDate: page.endDate,
      slug: page.slug,
      image: page.image,
    });
  } else {
    // Blog
    title = page.title;
    subtitle = page.description;
    dateInfo = page.date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    dateTimeValue = getISODateString(page);
    _dateLabel = `Published on ${dateInfo}`;
    pageSchema = createBlogPostingSchema({
      title: page.title,
      description: page.description,
      date: page.date,
      slug: page.slug,
      readingTime: page.readingTime,
      image: page.image,
    });
  }

  // Generate comprehensive alt text for images
  const generateImageAlt = (): string => {
    if (isProject) {
      return `Cover image for ${page.title} project`;
    }
    return `Cover image for blog post: ${page.title}`;
  };

  return (
    <>
      <JsonLd schemas={[pageSchema]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition enter="slide-in-right">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="space-y-2">
            <div>
              <h1 className="font-semibold text-2xl">{title}</h1>
              {subtitle && (
                <p className="text-foreground-muted" role="doc-subtitle">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="space-y-1 text-foreground-muted text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sr-only">Content type:</span>
                <span className="inline-block">{label}</span>
                <span aria-hidden="true" className="text-foreground-subtle">
                  |
                </span>
                <div className="flex gap-1">
                  <span className="sr-only">
                    {isBlog ? "Publication date:" : "Duration:"}
                  </span>
                  <span aria-hidden="true">
                    {isBlog ? "Published on" : "Duration:"}
                  </span>
                  <time dateTime={dateTimeValue}>{dateInfo}</time>
                </div>
              </div>
              {page.readingTime && (
                <p>
                  <span className="sr-only">Reading time:</span>
                  {page.readingTime}
                </p>
              )}
            </div>
            <ShareButtons
              page={{
                title,
                description: subtitle,
                content: page.content,
                type,
              }}
            />
          </header>
          <TableOfContents />
          {page.image && (
            <figure
              aria-labelledby="cover-image-caption"
              className="relative"
              role="img"
            >
              <Zoom
                classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
                wrapElement="span"
                zoomMargin={12}
              >
                <Image
                  alt={generateImageAlt()}
                  className="overflow-hidden rounded-md border border-border bg-background-muted/30"
                  height={630}
                  priority
                  quality={100}
                  src={page.image}
                  width={1200}
                />
              </Zoom>
              <figcaption className="sr-only" id="cover-image-caption">
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
