import { CaretRightIcon, LinkIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Breadcrumb from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  type ContentType,
  contentConfig,
  getContentByYear,
  isValidContentType,
} from "@/lib/content-utils/content-utils";
import { collectionSchema } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const generateMetadata = async ({
  params,
}: PageProps<"/[type]">): Promise<Metadata> => {
  const { type } = await params;

  if (!isValidContentType(type)) {
    return {};
  }

  const config = contentConfig[type];

  return createMetadata({
    title: config.title,
    description: config.description,
  });
};

export const generateStaticParams = (): { type: ContentType }[] => [
  { type: "project" },
  { type: "blog" },
];

export default async function TypeListingPage({
  params,
}: PageProps<"/[type]">) {
  const { type } = await params;

  if (!isValidContentType(type)) {
    notFound();
  }

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
    if ("date" in post && post.date) {
      // Blog posts - single date with day
      return post.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    if ("startDate" in post && post.startDate) {
      // Work and projects - date range without day
      const startDate = post.startDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      if ("endDate" in post && post.endDate) {
        const endDate = post.endDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
        return `${startDate} - ${endDate}`;
      }
      return `${startDate} - Present`;
    }

    return "";
  };

  // Helper function to get ISO date string for datetime attribute
  const getISODateString = (post: {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
  }) => {
    if ("date" in post && post.date) {
      return post.date.toISOString().split("T")[0];
    }
    if ("startDate" in post && post.startDate) {
      return post.startDate.toISOString().split("T")[0];
    }
    return "";
  };

  return (
    <>
      <JsonLd schemas={[collectionSchema(type, { title, description })]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition enter="slide-in-right">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="gap-0">
            <h1 className="font-medium text-lg">{title}</h1>
            <p className="text-foreground-muted">{description}</p>
          </header>

          {hasContent ? (
            <section aria-label={`${title} by year`}>
              {Object.entries(contentByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, posts]) => (
                  <section
                    aria-labelledby={year}
                    className="mb-8 divide-y divide-dashed divide-mirai-red"
                    key={year}
                  >
                    <h2 className="mb-2 font-normal text-mirai-red" id={year}>
                      <a
                        aria-label={`Jump to ${year} section`}
                        className={cn(
                          "group relative rounded-sm underline-offset-2",
                          "hover:underline"
                        )}
                        href={`#${year}`}
                      >
                        <LinkIcon
                          aria-hidden="true"
                          className={cn(
                            "absolute top-1/2 -left-4.5 size-3.5 -translate-y-1/2 opacity-0",
                            "group-hover:opacity-100 group-focus:opacity-100"
                          )}
                        />
                        <span>{year}</span>
                      </a>
                    </h2>
                    <ul
                      aria-label={`${type} from ${year}`}
                      className="grid gap-6"
                    >
                      {posts.map((post) => {
                        const dateTime = getISODateString(post);

                        return (
                          <li key={post._meta.path}>
                            <Link
                              aria-label={`Read ${post.title}: ${post.description}`}
                              className="group -m-2 flex items-center justify-between gap-2 rounded-md p-2"
                              href={`/${type}/${post.slug}`}
                            >
                              <div className="flex gap-4">
                                {post.image && (
                                  <div className="relative mt-1.5 aspect-square h-20 shrink-0 overflow-hidden rounded-md sm:aspect-video">
                                    <Image
                                      alt={post.title}
                                      className="object-cover"
                                      fill
                                      quality={25}
                                      sizes="150px"
                                      src={post.image}
                                    />
                                  </div>
                                )}
                                <div className="flex flex-col gap-1">
                                  <h3 className="font-medium text-lg group-hover:text-mirai-red">
                                    {post.title}
                                  </h3>
                                  <p className="line-clamp-2 text-foreground-lighter text-sm">
                                    {post.description}
                                  </p>
                                  <time
                                    className="text-foreground-lighter text-xs"
                                    dateTime={dateTime}
                                  >
                                    {formatDateRange(post)}
                                  </time>
                                </div>
                              </div>
                              <CaretRightIcon
                                aria-hidden="true"
                                className={cn(
                                  "size-4.5 shrink-0 transition-transform",
                                  "group-hover:translate-x-1 group-focus:translate-x-1"
                                )}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
            </section>
          ) : (
            <section
              aria-label="No content available"
              className="mt-8 py-12 text-center"
            >
              <p className="text-foreground-muted">No content available yet.</p>
            </section>
          )}
        </main>
      </ViewTransition>
    </>
  );
}
