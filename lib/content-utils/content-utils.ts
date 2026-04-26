import {
  allBlogs as rawBlogs,
  allProjects as rawProjects,
} from "content-collections";

export type ContentType = "project" | "blog";

interface Meta {
  path: string;
}
type MdxBody = string;

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// content-collections doesn't correctly infer transform output types, so we
// declare the shape explicitly here. The `kind` field is added by each
// transform in content-collections.ts and discriminates the union.
export interface Project {
  kind: "project";
  _meta: Meta;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  image?: string;
  body: MdxBody;
  content: string;
  slug: string;
  readingTime: string;
  tocItems: TocItem[];
  isOngoing: boolean;
  sortDate: Date;
  formattedStartDate: string;
  formattedEndDate: string;
  duration: number;
}

export interface Blog {
  kind: "blog";
  _meta: Meta;
  title: string;
  description: string;
  date: Date;
  image?: string;
  body: MdxBody;
  content: string;
  slug: string;
  readingTime: string;
  tocItems: TocItem[];
  formattedDate: string;
}

export type ContentItem = Project | Blog;

export const allProjects = rawProjects as unknown as Project[];
export const allBlogs = rawBlogs as unknown as Blog[];

export const contentConfig = {
  project: {
    title: "Project",
    description: "Professional and personal projects I have worked on.",
    collection: allProjects,
    label: "Project",
    pluralLabel: "Projects",
  },
  blog: {
    title: "Blog",
    description: "My thoughts, ideas, and experiences.",
    collection: allBlogs,
    label: "Article",
    pluralLabel: "Articles",
  },
} as const;

export const isValidContentType = (type: string): type is ContentType => {
  return type === "project" || type === "blog";
};

export function getCollection(type: "project"): Project[];
export function getCollection(type: "blog"): Blog[];
export function getCollection(type: ContentType): ContentItem[];
export function getCollection(type: ContentType): ContentItem[] {
  return contentConfig[type].collection;
}

export const getAllContent = (): ContentItem[] => [...allProjects, ...allBlogs];

const getRelevantDate = (item: ContentItem): Date =>
  item.kind === "blog" ? item.date : item.startDate;

export const getRecentContent = (limit = 5): ContentItem[] =>
  getAllContent()
    .sort((a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime())
    .slice(0, limit);

export const getRelatedContent = (
  currentSlug: string,
  currentType: ContentType,
  limit = 3
): ContentItem[] =>
  getAllContent()
    .filter((item) => !(item.slug === currentSlug && item.kind === currentType))
    .filter((item) => item.kind === currentType)
    .sort((a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime())
    .slice(0, limit);

export const getContentByYear = (
  type?: ContentType
): Record<number, ContentItem[]> => {
  const content: ContentItem[] = type ? getCollection(type) : getAllContent();

  return content
    .sort((a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime())
    .reduce(
      (acc, post) => {
        const year = getRelevantDate(post).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(post);
        return acc;
      },
      {} as Record<number, ContentItem[]>
    );
};

export const searchContent = (
  query: string,
  type?: ContentType
): ContentItem[] => {
  const content: ContentItem[] = type ? getCollection(type) : getAllContent();
  const searchTerm = query.toLowerCase();

  return content.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
  );
};

export const getContentStats = () => {
  return {
    projects: allProjects.length,
    blogs: allBlogs.length,
    total: allProjects.length + allBlogs.length,
  };
};
