import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Zoom from "react-medium-image-zoom";
import Breadcrumb from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { Mdx } from "@/components/mdx";
import {
  type ContentItem,
  type ContentType,
  contentConfig,
  getCollection,
  isValidContentType,
} from "@/lib/content-utils/content-utils";
import { formatISODateRange, formatLongDate, toISODate } from "@/lib/date";
import {
  createBlogPostingSchema,
  createProjectSchema,
} from "@/lib/json-ld/json-ld";
import { createMetadata } from "@/lib/metadata";
import { ShareButtons } from "./components/share/share";
import { TableOfContents } from "./components/toc/toc";

function getContentMeta(page: ContentItem) {
  if (page.kind === "project") {
    const startDate = formatLongDate(page.startDate);
    const endDate = page.endDate ? formatLongDate(page.endDate) : "Ongoing";

    return {
      dateInfo: `${startDate} - ${endDate}`,
      dateTimeValue: formatISODateRange(page.startDate, page.endDate),
      dateLabel: "Duration:",
      dateSrLabel: "Duration:",
      imageAlt: `Cover image for ${page.title} project`,
      schema: createProjectSchema({
        title: page.title,
        description: page.description,
        startDate: page.startDate,
        endDate: page.endDate,
        slug: page.slug,
        image: page.image,
      }),
    };
  }

  return {
    dateInfo: formatLongDate(page.date),
    dateTimeValue: toISODate(page.date),
    dateLabel: "Published on",
    dateSrLabel: "Publication date:",
    imageAlt: `Cover image for blog post: ${page.title}`,
    schema: createBlogPostingSchema({
      title: page.title,
      description: page.description,
      date: page.date,
      slug: page.slug,
      readingTime: page.readingTime,
      image: page.image,
    }),
  };
}

export const generateMetadata = async ({
  params,
}: PageProps<"/[type]/[slug]">): Promise<Metadata> => {
  const { type, slug } = await params;

  if (!isValidContentType(type)) {
    return {};
  }

  const collection = getCollection(type);
  const page = collection.find((p) => p._meta.path === slug);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
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
  const page = collection.find((p) => p._meta.path === slug);

  if (!page) {
    notFound();
  }

  const { label } = contentConfig[type];
  const { dateInfo, dateTimeValue, dateLabel, dateSrLabel, imageAlt, schema } =
    getContentMeta(page);

  return (
    <>
      <JsonLd schemas={[schema]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={page.title} pathname={`/${type}/${slug}`} />
      </div>
      <ViewTransition enter="slide-in-right">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="space-y-2">
            <div>
              <h1 className="font-semibold text-2xl">{page.title}</h1>
              {page.description ? (
                <p className="text-foreground-muted" role="doc-subtitle">
                  {page.description}
                </p>
              ) : null}
            </div>
            <div className="space-y-1 text-foreground-muted text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="sr-only">Content type:</span>
                <span className="inline-block">{label}</span>
                <span aria-hidden="true" className="text-foreground-subtle">
                  |
                </span>
                <div className="flex gap-1">
                  <span className="sr-only">{dateSrLabel}</span>
                  <span aria-hidden="true">{dateLabel}</span>
                  <time dateTime={dateTimeValue}>{dateInfo}</time>
                </div>
              </div>
              {page.readingTime ? (
                <p>
                  <span className="sr-only">Reading time:</span>
                  {page.readingTime}
                </p>
              ) : null}
            </div>
            <ShareButtons
              page={{
                title: page.title,
                description: page.description,
                type,
              }}
            />
          </header>

          <TableOfContents />

          {page.image ? (
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
                  alt={imageAlt}
                  className="overflow-hidden rounded-md border border-border bg-background-muted/30"
                  height={630}
                  loading="eager"
                  quality={100}
                  src={page.image}
                  width={1200}
                />
              </Zoom>
              <figcaption className="sr-only" id="cover-image-caption">
                {imageAlt}
              </figcaption>
            </figure>
          ) : null}

          <Mdx code={page.body} />
        </main>
      </ViewTransition>
    </>
  );
}
