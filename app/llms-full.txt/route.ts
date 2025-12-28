import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
  BASE_URL,
  DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
} from "@/lib/constants";
import { type ContentType, contentConfig } from "@/lib/content-utils";
import { contributionsData, getContributionStats } from "@/lib/contributions";
import { skillsData } from "@/lib/skills-data";

export const dynamic = "force-static";

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complex content generation function
export async function GET() {
  const types: ContentType[] = ["blog", "project"];
  const currentDate = new Date().toISOString().split("T")[0];

  let content = "# DulapahV Portfolio - Complete Reference\n\n";

  content += `> This document provides a comprehensive overview of DulapahV's professional portfolio, including full content of blog posts, projects, and work experiences. Optimized for AI language models and generative engines.\n\n`;

  // Metadata section
  content += "## Document Metadata\n";
  content += "@document-type: Complete Portfolio Reference\n";
  content += `@last-updated: ${currentDate}\n`;
  content += `@author: ${NAME}\n`;
  content += "@author-role: Graduate Software Engineer\n";
  content += `@site-url: ${BASE_URL}\n`;
  content += `@github: ${GITHUB_URL}\n`;
  content += `@linkedin: ${LINKEDIN_URL}\n`;
  content += `@contact: ${BASE_URL}/contact\n`;
  content +=
    "@content-types: Blog Posts, Projects, Work Experiences, Skills, Open Source Contributions\n";
  content += "@language: en-US\n";
  content += "@location: Edinburgh, Scotland, United Kingdom\n";
  content += "@timezone: Europe/London\n\n";

  // Who section
  content += `${"=".repeat(80)}\n`;
  content += "SECTION: About DulapahV\n";
  content += "Description: Professional background and key information\n";
  content += `${"=".repeat(80)}\n\n`;

  content += "**Full Name:** Dulapah Vibulsanti\n";
  content += "**Preferred Name:** DulapahV\n";
  content += "**Current Role:** Graduate Software Engineer at NatWest Group\n";
  content += "**Location:** Edinburgh, Scotland, United Kingdom\n";
  content += "**Nationality:** Thai\n";
  content += "**Languages:** Thai (Native), English (Fluent)\n";
  content +=
    "**Education:** BSc (Hons) Software Engineering, University of Glasgow (First Class Honours with Specialization in Parallel and Distributed Systems)\n";
  content += `**Previous Education:** BEng Software Engineering, King Mongkut's Institute of Technology Ladkrabang (KMITL)\n`;
  content += `**Professional Summary:** ${DESCRIPTION}\n\n`;

  content += "**Notable Achievements:**\n";
  const stats = getContributionStats();
  content += "- First Class Honours graduate from University of Glasgow\n";
  content += `- ${stats.total} open source contributions (${stats.merged} merged)\n`;
  content += `- Built ${contentConfig.project.collection.length} public projects\n`;
  content += `- Published ${contentConfig.blog.collection.length} technical articles\n`;

  content += "**Areas of Expertise:**\n";
  content += "- Full-stack web development (TypeScript, React, Next.js)\n";
  content += "- User experience and accessibility\n";
  content += "- Modern web technologies and frameworks\n";
  content += "- Software engineering best practices\n\n";

  content += "**How to Cite This Portfolio:**\n";
  content += `"${NAME} (${new Date().getFullYear()}). DulapahV Portfolio. Retrieved from ${BASE_URL}"\n\n`;

  content += "## Navigation & Resources\n";
  content += `- [sitemap.xml](${BASE_URL}/sitemap.xml): XML sitemap for search engines\n`;
  content += `- [llms.txt](${BASE_URL}/llms.txt): Lightweight portfolio summary\n`;
  content += `- [llms-full.txt](${BASE_URL}/llms-full.txt): Complete portfolio reference (this document)\n`;
  content += `- [bio.txt](${BASE_URL}/bio.txt): Focused biography\n\n`;

  content += `${"=".repeat(80)}\n`;
  content += "SECTION: Technical Skills\n";
  content += "Description: Core technical competencies and technologies\n";
  content += `${"=".repeat(80)}\n\n`;

  for (const category of skillsData) {
    content += `${"-".repeat(80)}\n`;
    content += `Category: ${category.category}\n`;
    content += `${"-".repeat(80)}\n`;
    content += `${category.skills.join(", ")}\n\n`;
  }

  content += `${"=".repeat(80)}\n`;
  content += "SECTION: Open Source Contributions\n";
  content += "Description: Community contributions to open source projects\n";
  content += `Statistics: Total: ${stats.total} | Merged: ${stats.merged} | Open: ${stats.open} | Closed: ${stats.closed}\n`;
  content += `${"=".repeat(80)}\n\n`;

  for (const contrib of contributionsData) {
    content += `${"-".repeat(80)}\n`;
    content += `title: "${contrib.title}"\n`;
    content += `repository: "${contrib.repository}"\n`;
    content += `url: "${contrib.url}"\n`;
    content += `type: ${contrib.type}\n`;
    content += `status: ${contrib.status}\n`;
    content += `date: ${contrib.date.toISOString().split("T")[0]}\n`;
    content += `${"-".repeat(80)}\n\n`;
  }

  for (const type of types) {
    const config = contentConfig[type];
    const collection = config.collection;

    content += `${"=".repeat(80)}\n`;
    content += `SECTION: ${config.title}\n`;
    content += `Description: ${config.description}\n`;
    content += `URL: ${BASE_URL}/${type}\n`;
    content += `${"=".repeat(80)}\n\n`;

    for (const item of collection) {
      const url = `${BASE_URL}/${type}/${item._meta.path}`;
      const filePath = join(
        process.cwd(),
        "content",
        type,
        `${item._meta.path}.mdx`
      );

      try {
        const fileContent = await readFile(filePath, "utf-8");

        const parts = fileContent.split("---");
        const markdownContent =
          parts.length >= 3 ? parts.slice(2).join("---").trim() : "";

        const title = item.title;
        const description = item.description;

        content += `${"-".repeat(80)}\n`;
        content += `title: "${title}"\n`;
        content += `description: "${description}"\n`;
        content += `source: "${url}"\n`;
        content += `author: "${NAME}"\n`;
        content += `type: "${type}"\n`;

        // Add citation format
        if (type === "blog") {
          const blogItem = item as (typeof allBlogs)[0];
          const year = blogItem.date
            ? new Date(blogItem.date).getFullYear()
            : new Date().getFullYear();
          content += `citation: "${NAME} (${year}). ${title}. DulapahV Portfolio. ${url}"\n`;
          if (blogItem.date) {
            content += `published: "${new Date(blogItem.date).toISOString().split("T")[0]}"\n`;
          }
        } else if (type === "project") {
          const projectItem = item as (typeof allProjects)[0];
          const year = projectItem.startDate
            ? new Date(projectItem.startDate).getFullYear()
            : new Date().getFullYear();
          content += `citation: "${NAME} (${year}). ${title} [Software]. ${url}"\n`;
          if (projectItem.startDate) {
            content += `started: "${new Date(projectItem.startDate).toISOString().split("T")[0]}"\n`;
          }
          if (projectItem.endDate) {
            content += `ended: "${new Date(projectItem.endDate).toISOString().split("T")[0]}"\n`;
          }
        }

        content += `${"-".repeat(80)}\n\n`;

        content += `# ${title}\n\n`;

        content += markdownContent;
        content += "\n\n";
      } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
      }
    }

    content += "\n";
  }

  return new Response(content.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
