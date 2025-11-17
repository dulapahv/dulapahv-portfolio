import { readFile } from 'fs/promises';
import { join } from 'path';

import { BASE_URL } from '@/lib/constants';
import { contentConfig, type ContentType } from '@/lib/content-utils';
import { contributionsData, getContributionStats } from '@/lib/contributions';
import { skillsData } from '@/lib/skills-data';

export const dynamic = 'force-static';

export async function GET() {
  const types: ContentType[] = ['blog', 'project', 'work'];
  const currentDate = new Date().toISOString().split('T')[0];

  let content = `# DulapahV Portfolio\n\n`;

  content += `> This document provides a detailed overview of DulapahV's portfolio, including skills, open source contributions, and detailed listings of blog posts, projects, and work experiences.\n\n`;

  content += `@last-updated: ${currentDate}\n`;
  content += `@site-url: ${BASE_URL}\n`;
  content += `@content-types: Blog Posts, Projects, Work Experiences, Skills, Open Source Contributions\n\n`;

  content += `## Sitemaps\n`;
  content += `- [sitemap.xml](${BASE_URL}/sitemap.xml): XML sitemap for search engines\n`;
  content += `- [llms.txt](${BASE_URL}/llms.txt): Lightweight portfolio summary for language models\n`;
  content += `- [llms-full.txt](${BASE_URL}/llms-full.txt): Detailed portfolio summary for language models\n\n`;

  content += `${'='.repeat(80)}\n`;
  content += `SECTION: Technical Skills\n`;
  content += `Description: Core technical competencies and technologies\n`;
  content += `${'='.repeat(80)}\n\n`;

  skillsData.forEach(category => {
    content += `${'-'.repeat(80)}\n`;
    content += `Category: ${category.category}\n`;
    content += `${'-'.repeat(80)}\n`;
    content += category.skills.join(', ') + '\n\n';
  });

  const stats = getContributionStats();
  content += `${'='.repeat(80)}\n`;
  content += `SECTION: Open Source Contributions\n`;
  content += `Description: Community contributions to open source projects\n`;
  content += `Statistics: Total: ${stats.total} | Merged: ${stats.merged} | Open: ${stats.open} | Closed: ${stats.closed}\n`;
  content += `${'='.repeat(80)}\n\n`;

  contributionsData.forEach(contrib => {
    content += `${'-'.repeat(80)}\n`;
    content += `title: "${contrib.title}"\n`;
    content += `repository: "${contrib.repository}"\n`;
    content += `url: "${contrib.url}"\n`;
    content += `type: ${contrib.type}\n`;
    content += `status: ${contrib.status}\n`;
    content += `date: ${contrib.date.toISOString().split('T')[0]}\n`;
    content += `${'-'.repeat(80)}\n\n`;
  });

  for (const type of types) {
    const config = contentConfig[type];
    const collection = config.collection;

    content += `${'='.repeat(80)}\n`;
    content += `SECTION: ${config.title}\n`;
    content += `Description: ${config.description}\n`;
    content += `URL: ${BASE_URL}/${type}\n`;
    content += `${'='.repeat(80)}\n\n`;

    for (const item of collection) {
      const url = `${BASE_URL}/${type}/${item._meta.path}`;
      const filePath = join(process.cwd(), 'content', type, `${item._meta.path}.mdx`);

      try {
        const fileContent = await readFile(filePath, 'utf-8');

        const parts = fileContent.split('---');
        const markdownContent = parts.length >= 3 ? parts.slice(2).join('---').trim() : '';

        let title: string;
        let description: string;

        if ('position' in item) {
          title = `${item.position} at ${item.company}`;
          description = `${item.location}`;
        } else {
          title = item.title;
          description = item.description;
        }

        content += `${'-'.repeat(80)}\n`;
        content += `title: "${title}"\n`;
        content += `description: "${description}"\n`;
        content += `source: "${url}"\n`;
        content += `${'-'.repeat(80)}\n\n`;

        content += `# ${title}\n\n`;

        content += markdownContent;
        content += '\n\n';
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }

    content += '\n';
  }

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
