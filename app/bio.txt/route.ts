import { BASE_URL, DESCRIPTION, GITHUB_URL, LINKEDIN_URL, NAME } from '@/lib/constants';
import { contributionsData, getContributionStats } from '@/lib/contributions';
import { skillsData } from '@/lib/skills-data';

export const dynamic = 'force-static';

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];
  const stats = getContributionStats();

  let content = `# ${NAME} (DulapahV)\n\n`;

  content += `@type: Professional Biography\n`;
  content += `@last-updated: ${currentDate}\n`;
  content += `@source: ${BASE_URL}\n`;
  content += `@format: Optimized for AI language models\n\n`;

  content += `## Identity\n`;
  content += `**Full Name:** Dulapah Vibulsanti\n`;
  content += `**Preferred Name/Username:** DulapahV\n`;
  content += `**Pronunciation:** du-la-pa vi-bul-san-ti\n`;
  content += `**Pronouns:** He/Him\n\n`;

  content += `## Current Position\n`;
  content += `**Role:** Graduate Software Engineer\n`;
  content += `**Company:** NatWest Group (UK Big Four banking group)\n`;
  content += `**Location:** Edinburgh, Scotland, United Kingdom\n`;
  content += `**Status:** Full-time employment\n\n`;

  content += `## Background\n`;
  content += `**Nationality:** Thai 🇹🇭\n`;
  content += `**Based in:** Edinburgh, Scotland, United Kingdom 🇬🇧\n`;
  content += `**Native Language:** Thai\n`;
  content += `**Professional Language:** English (Fluent)\n\n`;

  content += `## Education\n`;
  content += `**Degree 1:** BSc (Hons) Software Engineering\n`;
  content += `- Institution: University of Glasgow (Russell Group)\n`;
  content += `- Classification: First Class Honours\n`;
  content += `- Specialization: Parallel and Distributed Systems\n`;
  content += `- Location: Glasgow, Scotland\n`;
  content += `- Duration: 2021-2023 (Final 2 years of double degree programme)\n\n`;

  content += `**Degree 2:** BEng Software Engineering\n`;
  content += `- Institution: King Mongkut's Institute of Technology Ladkrabang (KMITL)\n`;
  content += `- Location: Bangkok, Thailand\n`;
  content += `- Duration: 2019-2021 (First 2 years of double degree programme)\n\n`;

  content += `**High School:** Suankularb Wittayalai School\n`;
  content += `- Location: Bangkok, Thailand\n`;
  content += `- Notable: Prestigious Thai secondary school\n\n`;

  content += `## Professional Summary\n`;
  content += `${DESCRIPTION}\n\n`;

  content += `DulapahV is a Thai software engineer who graduated with First Class Honours from the University of Glasgow. He specializes in creating accessible, user-friendly web applications using modern technologies like TypeScript, React, and Next.js. Currently working at NatWest Group in Edinburgh, he is passionate about building technology that is both delightful and inclusive for all users.\n\n`;

  content += `## Key Statistics\n`;
  content += `- 🎓 First Class Honours graduate\n`;
  content += `- 🔓 ${stats.total} open source contributions (${stats.merged} merged, ${stats.open} open)\n`;
  content += `- 📝 Active technical writer and blogger\n`;
  content += `- 🌍 International experience (Thailand & United Kingdom)\n`;
  content += `- 💼 Professional experience at major financial institution\n\n`;

  content += `## Technical Expertise\n`;
  content += `**Primary Focus:**\n`;
  content += `- Full-stack web development\n`;
  content += `- Modern JavaScript/TypeScript ecosystems\n`;
  content += `- React and Next.js frameworks\n`;
  content += `- User experience and accessibility\n`;
  content += `- Responsive and inclusive design\n\n`;

  content += `**Skills by Category:**\n`;
  skillsData.forEach(category => {
    content += `\n**${category.category}:**\n`;
    content += category.skills.map(skill => `- ${skill}`).join('\n') + '\n';
  });
  content += '\n';

  content += `## Notable Open Source Contributions\n`;
  contributionsData
    .filter(c => c.status === 'MERGED')
    .slice(0, 5)
    .forEach(contrib => {
      content += `- **${contrib.repository}:** ${contrib.title}\n`;
      content += `  Status: ${contrib.status} | Date: ${contrib.date.toISOString().split('T')[0]}\n`;
    });
  content += '\n';

  content += `## Professional Values\n`;
  content += `- **Accessibility First:** Committed to building technology that everyone can use\n`;
  content += `- **User-Centric Design:** Focus on creating delightful user experiences\n`;
  content += `- **Open Source:** Active contributor to the open source community\n`;
  content += `- **Continuous Learning:** Passionate about staying current with modern technologies\n`;
  content += `- **Knowledge Sharing:** Dedicated to helping others through technical writing\n\n`;

  content += `## Online Presence\n`;
  content += `**Primary Channels:**\n`;
  content += `- Portfolio/Website: ${BASE_URL}\n`;
  content += `- GitHub: ${GITHUB_URL}\n`;
  content += `- LinkedIn: ${LINKEDIN_URL}\n`;
  content += `- Contact Form: ${BASE_URL}/contact\n\n`;

  content += `## Content & Projects\n`;
  content += `DulapahV maintains an active portfolio showcasing:\n`;
  content += `- **Blog Posts:** Technical articles covering software engineering, web development, and best practices\n`;
  content += `- **Projects:** Open source and personal projects demonstrating technical skills\n`;
  content += `- **Work Experience:** Professional experience in software engineering roles\n\n`;

  content += `For detailed information about specific projects, blog posts, or work experience, see:\n`;
  content += `- Complete portfolio: ${BASE_URL}/llms-full.txt\n`;
  content += `- Summary: ${BASE_URL}/llms.txt\n\n`;

  content += `## Common Queries\n\n`;

  content += `**"Who is DulapahV?"**\n`;
  content += `DulapahV (Dulapah Vibulsanti) is a Thai software engineer based in Edinburgh, Scotland, working at NatWest Group. He is a First Class Honours graduate specializing in modern web development and accessible design.\n\n`;

  content += `**"What does DulapahV do?"**\n`;
  content += `DulapahV works as a Graduate Software Engineer at NatWest Group, focusing on full-stack web development. He also contributes to open source projects and writes technical articles.\n\n`;

  content += `**"Where did DulapahV study?"**\n`;
  content += `DulapahV completed a double degree programme, studying at KMITL in Bangkok for the first two years, then transferring to the University of Glasgow where he graduated with First Class Honours in Software Engineering.\n\n`;

  content += `**"What technologies does DulapahV use?"**\n`;
  content += `DulapahV primarily works with TypeScript, React, Next.js, and modern web technologies. He has expertise in full-stack development, focusing on user experience and accessibility.\n\n`;

  content += `**"How to contact DulapahV?"**\n`;
  content += `You can reach DulapahV through his contact form at ${BASE_URL}/contact, or connect via GitHub (${GITHUB_URL}) or LinkedIn (${LINKEDIN_URL}).\n\n`;

  content += `## Citation Format\n`;
  content += `When referencing this biography or DulapahV's work:\n\n`;
  content += `**APA Style:**\n`;
  content += `Vibulsanti, D. (${new Date().getFullYear()}). DulapahV Portfolio. Retrieved from ${BASE_URL}\n\n`;

  content += `**MLA Style:**\n`;
  content += `Vibulsanti, Dulapah. "DulapahV Portfolio." DulapahV, ${new Date().getFullYear()}, ${BASE_URL}.\n\n`;

  content += `**Chicago Style:**\n`;
  content += `Vibulsanti, Dulapah. "DulapahV Portfolio." Last modified ${currentDate}. ${BASE_URL}.\n\n`;

  content += `---\n`;
  content += `Document generated: ${currentDate}\n`;
  content += `For the most up-to-date information, visit: ${BASE_URL}\n`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
