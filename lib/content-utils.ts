import { allBlogs, allProjects, allWorks } from 'content-collections';

export type ContentType = 'project' | 'blog' | 'work';

export type ContentItem =
  | (typeof allProjects)[0]
  | (typeof allBlogs)[0]
  | (typeof allWorks)[0];

export const contentConfig = {
  project: {
    title: 'Projects',
    description: 'Professional and personal projects I have worked on.',
    collection: allProjects,
    label: 'Project',
    pluralLabel: 'Projects',
  },
  blog: {
    title: 'Blog',
    description: 'My thoughts, ideas, and experiences.',
    collection: allBlogs,
    label: 'Article',
    pluralLabel: 'Articles',
  },
  work: {
    title: 'Work',
    description: "Companies and clients I've worked with.",
    collection: allWorks,
    label: 'Case Study',
    pluralLabel: 'Case Studies',
  },
} as const;

export const isValidContentType = (type: string): type is ContentType => {
  return type === 'project' || type === 'blog' || type === 'work';
};

export const getCollection = (type: ContentType) => {
  return contentConfig[type].collection;
};

export const getAllContent = (): Array<ContentItem & { type: ContentType }> => {
  const projects = allProjects.map((item) => ({
    ...item,
    type: 'project' as ContentType,
  }));
  const blogs = allBlogs.map((item) => ({
    ...item,
    type: 'blog' as ContentType,
  }));
  const works = allWorks.map((item) => ({
    ...item,
    type: 'work' as ContentType,
  }));

  return [...projects, ...blogs, ...works];
};

// Helper function to get the relevant date for sorting
const getRelevantDate = (item: ContentItem): Date => {
  if ('date' in item) {
    return item.date;
  }
  // For work/project items, use startDate for sorting
  return item.startDate;
};

export const getRecentContent = (
  limit = 5,
): Array<ContentItem & { type: ContentType }> => {
  return getAllContent()
    .sort((a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime())
    .slice(0, limit);
};

export const getRelatedContent = (
  currentSlug: string,
  currentType: ContentType,
  limit = 3,
): Array<ContentItem & { type: ContentType }> => {
  const allContent = getAllContent();

  // Filter out current item and get items of the same type
  return allContent
    .filter((item) => !(item.slug === currentSlug && item.type === currentType))
    .filter((item) => item.type === currentType)
    .sort((a, b) => getRelevantDate(b).getTime() - getRelevantDate(a).getTime())
    .slice(0, limit);
};

export const getContentByYear = (type?: ContentType) => {
  const content = type ? getCollection(type) : getAllContent();

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
      {} as Record<number, typeof content>,
    );
};

export const searchContent = (
  query: string,
  type?: ContentType,
): Array<ContentItem & { type?: ContentType }> => {
  const content = type ? getCollection(type) : getAllContent();
  const searchTerm = query.toLowerCase();

  return content.filter((item) => {
    if ('position' in item) {
      // For work items
      return (
        item.position.toLowerCase().includes(searchTerm) ||
        item.company.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
      );
    } else {
      // For projects and blogs
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }
  });
};

export const getContentStats = () => {
  return {
    projects: allProjects.length,
    blogs: allBlogs.length,
    works: allWorks.length,
    total: allProjects.length + allBlogs.length + allWorks.length,
  };
};
