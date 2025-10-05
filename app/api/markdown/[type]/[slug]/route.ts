import { readFile } from 'fs/promises';
import { join } from 'path';
import { notFound } from 'next/navigation';

import matter from 'gray-matter';

import { BASE_URL } from '@/lib/constants';
import {
  getCollection,
  isValidContentType,
  type ContentType,
} from '@/lib/content-utils';

export async function GET(
  req: Request,
  ctx: RouteContext<'/api/markdown/[type]/[slug]'>,
) {
  const { type, slug } = await ctx.params;

  if (!isValidContentType(type)) {
    notFound();
  }

  try {
    // Read and parse the MDX file
    const filePath = join(
      '/opt/buildhome/repo/',
      'content',
      type,
      `${slug}.mdx`,
    );
    const fileContent = await readFile(filePath, 'utf-8');

    // Parse frontmatter and content
    const { data: frontmatter, content: bodyContent } = matter(fileContent);

    // Get additional metadata from content-collections
    const collection = getCollection(type as ContentType);
    const page = collection.find((p) => p._meta.path === slug);

    if (!page) {
      notFound();
    }

    // Build markdown with parsed data
    const title = `${frontmatter.title || frontmatter.position || 'Untitled'}`;
    let mdContent = `# ${title}\n\n`;

    if (frontmatter.description) {
      mdContent += `> ${frontmatter.description}\n\n`;
    }

    mdContent += `**Type:** ${type.charAt(0).toUpperCase() + type.slice(1)}\n`;

    if (frontmatter.company) {
      mdContent += `**Company:** ${frontmatter.company}\n`;
      mdContent += `**Location:** ${frontmatter.location}\n`;
    }

    const formatDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);

      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    };

    if (frontmatter.date) {
      mdContent += `**Published:** ${formatDate(frontmatter.date)}\n`;
    } else if (frontmatter.startDate) {
      const endDate = frontmatter.endDate || 'Present';
      mdContent += `**Duration:** ${formatDate(frontmatter.startDate)} - ${
        endDate === 'Present' ? endDate : formatDate(endDate)
      }\n`;
    }

    mdContent += `**URL:** ${BASE_URL}/${type}/${slug}\n`;
    mdContent += `**Accessed:** ${new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}\n`;

    let coverImageAltText = '';
    if (type === 'work') {
      coverImageAltText = `Cover image for ${frontmatter.position} position at ${frontmatter.company}`;
    } else if (type === 'project') {
      coverImageAltText = `Cover image for ${frontmatter.title} project`;
    } else {
      coverImageAltText = `Cover image for blog post: ${frontmatter.title}`;
    }

    if (frontmatter.image) {
      const imageUrl = frontmatter.image.startsWith('http')
        ? frontmatter.image
        : `${BASE_URL}${frontmatter.image}`;
      mdContent += `\n![${coverImageAltText}](${imageUrl})\n`;
    }

    mdContent += '\n---\n';
    mdContent += bodyContent;

    return new Response(mdContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Content-Disposition': `inline; filename="${slug}.md"`,
      },
    });
  } catch (error) {
    console.error('Error loading markdown:', error);
    notFound();
  }
}
