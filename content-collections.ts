import { defineCollection, defineConfig, type Context, type Meta } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
  transformerRenderIndentGuides
} from '@shikijs/transformers';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeKatex from 'rehype-katex';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { notificationTypes } from '@/lib/admonitions';

// Helper function to parse DD-MM-YYYY format
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to format date to DD-MM-YYYY
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          theme: 'plastic',
          transformers: [
            transformerNotationDiff(),
            transformerNotationWordHighlight(),
            transformerNotationErrorLevel(),
            transformerColorizedBrackets(),
            transformerRenderIndentGuides()
          ]
        }
      ],
      [rehypeKatex, { output: 'mathml' }],
      [
        rehypeGithubAlerts,
        {
          alerts: notificationTypes
        }
      ],
      rehypePresetMinify
    ]
  });

  return {
    body,
    slug: page._meta.path,
    readingTime: readingTime(page.content).text
  };
};

// Collection for works with position, company, and location
const createWorkCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: z => ({
      position: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'Start date must be in DD-MM-YYYY format')
        .transform(parseDate),
      endDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'End date must be in DD-MM-YYYY format')
        .transform(parseDate)
        .optional(),
      image: z.string().optional()
    }),
    transform: async (page, context) => {
      const baseResult = await baseTransform(page, context);

      // Calculate if this is a present/ongoing item
      const isPresent = !page.endDate;

      // For sorting purposes, use current date if no end date
      const sortDate = page.endDate || new Date();

      // Validate that startDate is before endDate if both exist
      if (page.endDate && page.startDate > page.endDate) {
        throw new Error(
          `Invalid date range for ${page.company} - ${page.position}: start date (${formatDate(
            page.startDate
          )}) is after end date (${formatDate(page.endDate)})`
        );
      }

      return {
        ...page,
        ...baseResult,
        // Add title and description derived from work fields for compatibility
        position: page.position,
        company: page.company,
        location: page.location,
        isPresent,
        sortDate,
        // Add formatted date strings for easy display
        formattedStartDate: formatDate(page.startDate),
        formattedEndDate: page.endDate ? formatDate(page.endDate) : 'Present',
        // Add duration calculation
        duration: page.endDate
          ? Math.ceil(
              (page.endDate.getTime() - page.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
            ) // months
          : Math.ceil(
              (new Date().getTime() - page.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
            ) // months to present
      };
    }
  });

// Collection for projects with start and end dates
const createProjectCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: z => ({
      title: z.string(),
      description: z.string(),
      startDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'Start date must be in DD-MM-YYYY format')
        .transform(parseDate),
      endDate: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'End date must be in DD-MM-YYYY format')
        .transform(parseDate)
        .optional(),
      image: z.string().optional()
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
        isOngoing,
        sortDate,
        // Add formatted date strings for easy display
        formattedStartDate: formatDate(page.startDate),
        formattedEndDate: page.endDate ? formatDate(page.endDate) : 'Ongoing',
        // Add duration calculation
        duration: page.endDate
          ? Math.ceil(
              (page.endDate.getTime() - page.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
            ) // months
          : Math.ceil(
              (new Date().getTime() - page.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
            ) // months to present
      };
    }
  });

// Collection for blogs with single date
const createBlogCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: z => ({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format')
        .transform(parseDate),
      image: z.string().optional()
    }),
    transform: async (page, context) => {
      const baseResult = await baseTransform(page, context);

      return {
        ...page,
        ...baseResult,
        formattedDate: formatDate(page.date)
      };
    }
  });

// Create collections
const works = createWorkCollection('works', 'content/work');
const projects = createProjectCollection('projects', 'content/project');
const blogs = createBlogCollection('blogs', 'content/blog');

export default defineConfig({
  collections: [works, projects, blogs]
});
