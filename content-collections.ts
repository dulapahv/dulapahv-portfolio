import {
  type Context,
  defineCollection,
  defineConfig,
  type Meta,
} from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
  transformerRenderIndentGuides,
  transformerStyleToClass,
} from "@shikijs/transformers";
import GithubSlugger from "github-slugger";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString as mdastToString } from "mdast-util-to-string";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeKatex from "rehype-katex";
import rehypePresetMinify from "rehype-preset-minify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { notificationTypes } from "@/lib/admonitions/admonitions";

// biome-ignore lint/style/useConsistentTypeDefinitions: content-collections' serializability check requires a type alias, not an interface
type TocItem = {
  id: string;
  text: string;
  level: number;
};

// TOC is extracted from the raw markdown source via mdast rather than from
// the compiled body, because content-collections caches `compileMDX` output
// and rehype plugins don't re-run on cache hits.
const extractTocFromMarkdown = (content: string): TocItem[] => {
  const tree = fromMarkdown(content);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const node of tree.children) {
    if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3)) {
      continue;
    }
    const text = mdastToString(node).trim();
    if (!text) {
      continue;
    }
    items.push({
      id: slugger.slug(text),
      text,
      level: node.depth,
    });
  }

  return items;
};

const DATE_FORMAT_REGEX = /^\d{2}-\d{2}-\d{4}$/;

// Helper function to parse DD-MM-YYYY format
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to format date to MMM YYYY (e.g., Feb 2024)
const formatDate = (date: Date): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

// Base transform function for MDX compilation
const baseTransform = async (
  page: {
    _meta: Meta;
    content: string;
  },
  context: Context
) => {
  const body = await compileMDX(context, page, {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: "plastic",
          transformers: [
            transformerStyleToClass({
              classPrefix: "mirai_",
            }),
            transformerNotationDiff(),
            transformerNotationWordHighlight(),
            transformerNotationErrorLevel(),
            transformerColorizedBrackets(),
            transformerRenderIndentGuides(),
          ],
        },
      ],
      [rehypeKatex, { output: "mathml" }],
      [
        rehypeGithubAlerts,
        {
          alerts: notificationTypes,
        },
      ],
      rehypePresetMinify,
    ],
  });

  return {
    body,
    slug: page._meta.path,
    readingTime: readingTime(page.content).text,
    tocItems: extractTocFromMarkdown(page.content),
  };
};

// Collection for projects with start and end dates
const createProjectCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: "*.mdx",
    schema: (z) => ({
      title: z.string(),
      description: z.string(),
      startDate: z
        .string()
        .regex(DATE_FORMAT_REGEX, "Start date must be in DD-MM-YYYY format")
        .transform(parseDate),
      endDate: z
        .string()
        .regex(DATE_FORMAT_REGEX, "End date must be in DD-MM-YYYY format")
        .transform(parseDate)
        .optional(),
      image: z.string().optional(),
    }),
    transform: async (page, context) => {
      const baseResult = await baseTransform(page, context);

      // Calculate if this is an ongoing project
      const isOngoing = !page.endDate;

      // For sorting purposes, use current date if no end date
      const sortDate = page.endDate || new Date();

      // Validate that startDate is before endDate if both exist
      if (page.endDate && page.startDate > page.endDate) {
        throw new Error(
          `Invalid date range for ${page.title}: start date (${formatDate(
            page.startDate
          )}) is after end date (${formatDate(page.endDate)})`
        );
      }

      return {
        ...page,
        ...baseResult,
        kind: "project" as const,
        isOngoing,
        sortDate,
        // Add formatted date strings for easy display
        formattedStartDate: formatDate(page.startDate),
        formattedEndDate: page.endDate ? formatDate(page.endDate) : "Ongoing",
        // Add duration calculation
        duration: page.endDate
          ? Math.ceil(
              (page.endDate.getTime() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30)
            ) // months
          : Math.ceil(
              (Date.now() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30)
            ), // months to present
      };
    },
  });

// Collection for blogs with single date
const createBlogCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: "*.mdx",
    schema: (z) => ({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .regex(DATE_FORMAT_REGEX, "Date must be in DD-MM-YYYY format")
        .transform(parseDate),
      image: z.string().optional(),
    }),
    transform: async (page, context) => {
      const baseResult = await baseTransform(page, context);

      return {
        ...page,
        ...baseResult,
        kind: "blog" as const,
        formattedDate: formatDate(page.date),
      };
    },
  });

// Create collections
const projects = createProjectCollection("projects", "content/project");
const blogs = createBlogCollection("blogs", "content/blog");

export default defineConfig({
  collections: [projects, blogs],
});
