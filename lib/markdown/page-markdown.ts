import {
  BASE_URL,
  CONTACT_EMAIL,
  DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
  NAME,
} from "@/lib/constants";
import {
  type ContentItem,
  type ContentType,
  contentConfig,
  getCollection,
} from "@/lib/content-utils/content-utils";
import { mdxToMarkdown } from "./mdx-to-markdown";

const canonical = (path: string): string =>
  `[${BASE_URL}${path}](${BASE_URL}${path})`;

const itemDates = (item: ContentItem): string =>
  item.kind === "blog"
    ? `**Published:** ${item.formattedDate}`
    : `**Duration:** ${item.formattedStartDate} - ${item.formattedEndDate}`;

export const buildHomeMarkdown = (): string => {
  const sections = (["blog", "project"] as const).map((type) => {
    const { title, description } = contentConfig[type];
    return `- [${title}](${BASE_URL}/${type}): ${description}`;
  });

  return `# ${NAME}

> ${DESCRIPTION}

**Canonical URL:** ${canonical("/")}

## Sections

${sections.join("\n")}
- [Contact](${BASE_URL}/contact): Get in touch

## Links

- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}
- Email: ${CONTACT_EMAIL}

## Other machine-readable views

- [llms.txt](${BASE_URL}/llms.txt): portfolio summary for language models
- [llms-full.txt](${BASE_URL}/llms-full.txt): detailed portfolio summary
- [bio.txt](${BASE_URL}/bio.txt): focused biography
- [sitemap.xml](${BASE_URL}/sitemap.xml): every indexable URL`;
};

export const buildContactMarkdown = (): string => `# Contact ${NAME}

> ${DESCRIPTION}

**Canonical URL:** ${canonical("/contact")}

## How to get in touch

- Email: ${CONTACT_EMAIL}
- LinkedIn: ${LINKEDIN_URL}
- GitHub: ${GITHUB_URL}

A contact form is available at ${BASE_URL}/contact.`;

export const buildListingMarkdown = (type: ContentType): string => {
  const { title, description, pluralLabel } = contentConfig[type];

  const entries = getCollection(type).map((item) => {
    const url = `${BASE_URL}/${type}/${item._meta.path}`;
    return `### [${item.title}](${url})\n\n${item.description}\n\n${itemDates(item)} | **Reading time:** ${item.readingTime}`;
  });

  return `# ${title}

> ${description}

**Canonical URL:** ${canonical(`/${type}`)}

## ${pluralLabel} (${entries.length})

${entries.join("\n\n")}`;
};

export const buildDetailMarkdown = (
  item: ContentItem,
  type: ContentType
): string => {
  const path = `/${type}/${item._meta.path}`;

  return `# ${item.title}

> ${item.description}

**Canonical URL:** ${canonical(path)}
${itemDates(item)} | **Reading time:** ${item.readingTime}

---

${mdxToMarkdown(item.content)}`;
};
