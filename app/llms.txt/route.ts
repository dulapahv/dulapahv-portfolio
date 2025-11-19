import { BASE_URL, DESCRIPTION, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import { contentConfig, type ContentType } from '@/lib/content-utils';
import { contributionsData, getContributionStats } from '@/lib/contributions';
import { skillsData } from '@/lib/skills-data';

export const dynamic = 'force-static';

export async function GET() {
  const types: ContentType[] = ['blog', 'project', 'work'];

  let content = `# DulapahV Portfolio\n\n`;

  content += `> This document provides an overview of DulapahV's portfolio, including skills, open source contributions, and detailed listings of blog posts, projects, and work experiences.\n\n`;

  // Who section
  content += `## Who is DulapahV?\n\n`;
  content += `**Name:** Dulapah Vibulsanti (DulapahV)\n`;
  content += `**Role:** Graduate Software Engineer at NatWest Group\n`;
  content += `**Location:** Edinburgh, Scotland, United Kingdom\n`;
  content += `**Nationality:** Thai\n`;
  content += `**Education:** BSc (Hons) Software Engineering from University of Glasgow (First Class Honours with Specialization in Parallel and Distributed Systems)\n`;
  content += `**Description:** ${DESCRIPTION}\n\n`;

  content += `### Quick Facts\n`;
  content += `- 🎓 Double degree graduate from University of Glasgow and KMITL\n`;
  content += `- 💼 Currently working as Graduate Software Engineer at NatWest Group (UK Big Four bank)\n`;
  content += `- 🌍 Based in Edinburgh, Scotland\n`;
  content += `- 🇹🇭 Native Thai speaker, fluent in English\n`;
  content += `- 🔓 Open source contributor with ${contributionsData.filter(c => c.status === 'MERGED').length} merged contributions\n`;
  content += `- 📝 Technical writer sharing knowledge about software engineering\n\n`;

  content += `### Professional Links\n`;
  content += `- GitHub: ${GITHUB_URL}\n`;
  content += `- LinkedIn: ${LINKEDIN_URL}\n`;
  content += `- Website: ${BASE_URL}\n`;
  content += `- Contact: ${BASE_URL}/contact\n\n`;

  content += `## Frequently Asked Questions\n\n`;
  content += `**Q: What does DulapahV specialize in?**\n`;
  content += `A: DulapahV is a full-stack software engineer with expertise in TypeScript, React, Next.js, and modern web technologies. He focuses on creating accessible and delightful user experiences.\n\n`;

  content += `**Q: Where is DulapahV based?**\n`;
  content += `A: DulapahV is currently based in Edinburgh, Scotland, United Kingdom, working at NatWest Group.\n\n`;

  content += `**Q: What kind of projects has DulapahV worked on?**\n`;
  content += `A: DulapahV has built various projects including educational tools (CalcLab, AceMath), productivity applications (MyStudyPlan, Latexly), and web development utilities. See the Projects section below for details.\n\n`;

  content += `**Q: Does DulapahV write technical articles?**\n`;
  content += `A: Yes, DulapahV writes technical blog posts covering topics like software engineering career guidance, web development best practices, and modern framework techniques. See the Blog Posts section below.\n\n`;

  content += `**Q: How can I contact DulapahV?**\n`;
  content += `A: You can reach DulapahV through the contact form at ${BASE_URL}/contact, or connect on LinkedIn (${LINKEDIN_URL}) or GitHub (${GITHUB_URL}).\n\n`;

  content += `## Sitemaps\n`;
  content += `- [sitemap.xml](${BASE_URL}/sitemap.xml): XML sitemap for search engines\n`;
  content += `- [llms.txt](${BASE_URL}/llms.txt): Lightweight portfolio summary for language models\n`;
  content += `- [llms-full.txt](${BASE_URL}/llms-full.txt): Detailed portfolio summary for language models\n`;
  content += `- [bio.txt](${BASE_URL}/bio.txt): Focused biography for AI queries\n\n`;

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
