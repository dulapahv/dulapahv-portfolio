import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationWordHighlight,
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseTransform = async (page: any, context: any) => {
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
          ],
        },
      ],
      [rehypeKatex, { output: 'mathml' }],
      [
        rehypeGithubAlerts,
        {
          alerts: [
            {
              keyword: 'NOTE',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
              title: '',
            },
            {
              keyword: 'IMPORTANT',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-warning-icon lucide-message-square-warning"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v2"/><path d="M12 13h.01"/></svg>',
              title: '',
            },
            {
              keyword: 'WARNING',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
              title: '',
            },
            {
              keyword: 'TIP',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
              title: '',
            },
            {
              keyword: 'CAUTION',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert-icon lucide-octagon-alert"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>',
              title: '',
            },
          ],
        },
      ],
      rehypePresetMinify,
    ],
  });

  return {
    body,
    slug: page._meta.path,
    readingTime: readingTime(page.content).text,
  };
};

// Collection for works with position, company, and location
const createWorkCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: (z) => ({
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
      image: z.string().optional(),
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
            page.startDate,
          )}) is after end date (${formatDate(page.endDate)})`,
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
              (page.endDate.getTime() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            ) // months
          : Math.ceil(
              (new Date().getTime() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            ), // months to present
      };
    },
  });

// Collection for projects with start and end dates
const createProjectCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: (z) => ({
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
            page.startDate,
          )}) is after end date (${formatDate(page.endDate)})`,
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
              (page.endDate.getTime() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            ) // months
          : Math.ceil(
              (new Date().getTime() - page.startDate.getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            ), // months to present
      };
    },
  });

// Collection for blogs with single date
const createBlogCollection = (name: string, directory: string) =>
  defineCollection({
    name,
    directory,
    include: '*.mdx',
    schema: (z) => ({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format')
        .transform(parseDate),
      image: z.string().optional(),
    }),
    transform: async (page, context) => {
      const baseResult = await baseTransform(page, context);

      return {
        ...page,
        ...baseResult,
        formattedDate: formatDate(page.date),
      };
    },
  });

// Create collections
const works = createWorkCollection('works', 'content/work');
const projects = createProjectCollection('projects', 'content/project');
const blogs = createBlogCollection('blogs', 'content/blog');

export default defineConfig({
  collections: [works, projects, blogs],
});
