import { BASE_URL } from '@/lib/constants';
import { contentConfig, type ContentType } from '@/lib/content-utils';
import { contributionsData, getContributionStats } from '@/lib/contributions';
import { skillsData } from '@/lib/skills-data';

export const dynamic = 'force-static';

export async function GET() {
  const types: ContentType[] = ['blog', 'project', 'work'];

  let content = `# DulapahV Portfolio\n\n`;

  content += `> This document provides an overview of DulapahV's portfolio, including skills, open source contributions, and detailed listings of blog posts, projects, and work experiences.\n\n`;

  content += `## Sitemaps\n`;
  content += `- [sitemap.xml](${BASE_URL}/sitemap.xml): XML sitemap for search engines\n`;
  content += `- [llms.txt](${BASE_URL}/llms.txt): Lightweight portfolio summary for language models\n`;
  content += `- [llms-full.txt](${BASE_URL}/llms-full.txt): Detailed portfolio summary for language models\n\n`;

  content += `## Skills\n`;
  const allSkills = skillsData.flatMap(category => category.skills);
  content += allSkills.map(skill => `- ${skill}`).join('\n') + '\n\n';

  const stats = getContributionStats();
  content += `## Open Source Contributions\n`;
  content += `- Total contributions: ${stats.total} (${stats.merged} merged, ${stats.open} open, ${stats.closed} closed)\n`;
  content += `- Recent contributions:\n`;
  contributionsData.slice(0, 3).forEach(contrib => {
    content += `- [${contrib.title}](${contrib.url}) - ${contrib.repository} (${contrib.status})\n`;
  });
  content += '\n';

  content += `## Main Pages\n`;
  content += `- [Home](${BASE_URL}): Portfolio homepage\n`;
  content += `- [Contact](${BASE_URL}/contact): Get in touch\n\n`;

  types.forEach(type => {
    const config = contentConfig[type];
    const collection = config.collection;

    content += `## ${config.title}\n`;
    content += `- [${config.title}](${BASE_URL}/${type}): ${config.description}\n`;

    collection.forEach(item => {
      const url = `${BASE_URL}/${type}/${item._meta.path}`;

      let title: string;
      let description: string;

      if ('position' in item) {
        title = `${item.position} at ${item.company}`;
        description = `${item.location}`;
      } else {
        title = item.title;
        description = item.description;
      }

      content += `- [${title}](${url}): ${description}\n`;
    });

    content += '\n';
  });

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
