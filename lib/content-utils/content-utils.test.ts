import { describe, expect, it, vi } from 'vitest';

import {
  contentConfig,
  ContentType,
  getAllContent,
  getCollection,
  getContentByYear,
  getContentStats,
  getRecentContent,
  getRelatedContent,
  isValidContentType,
  searchContent
} from './content-utils';

// Mock content-collections
vi.mock('content-collections', () => ({
  allProjects: [
    {
      slug: 'project-1',
      title: 'Project One',
      description: 'First project description',
      startDate: new Date('2024-01-15')
    },
    {
      slug: 'project-2',
      title: 'Project Two',
      description: 'Second project description',
      startDate: new Date('2024-03-20')
    }
  ],
  allBlogs: [
    {
      slug: 'blog-1',
      title: 'Blog Post One',
      description: 'First blog description',
      date: new Date('2024-02-10')
    },
    {
      slug: 'blog-2',
      title: 'Blog Post Two',
      description: 'Second blog description',
      date: new Date('2024-04-05')
    }
  ],
  allWorks: [
    {
      slug: 'work-1',
      position: 'Software Engineer',
      company: 'Tech Company',
      location: 'Edinburgh',
      startDate: new Date('2023-06-01')
    },
    {
      slug: 'work-2',
      position: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'London',
      startDate: new Date('2024-01-01')
    }
  ]
}));

describe('content-utils', () => {
  describe('contentConfig', () => {
    it('should have project configuration', () => {
      expect(contentConfig.project).toBeDefined();
      expect(contentConfig.project.title).toBe('Project');
      expect(contentConfig.project.label).toBe('Project');
      expect(contentConfig.project.pluralLabel).toBe('Projects');
    });

    it('should have blog configuration', () => {
      expect(contentConfig.blog).toBeDefined();
      expect(contentConfig.blog.title).toBe('Blog');
      expect(contentConfig.blog.label).toBe('Article');
      expect(contentConfig.blog.pluralLabel).toBe('Articles');
    });
  });

  describe('isValidContentType', () => {
    it('should return true for valid content types', () => {
      expect(isValidContentType('project')).toBe(true);
      expect(isValidContentType('blog')).toBe(true);
    });

    it('should return false for invalid content types', () => {
      expect(isValidContentType('invalid')).toBe(false);
      expect(isValidContentType('projects')).toBe(false);
      expect(isValidContentType('article')).toBe(false);
      expect(isValidContentType('')).toBe(false);
    });
  });

  describe('getCollection', () => {
    it('should return correct collection for project type', () => {
      const collection = getCollection('project');
      expect(collection).toHaveLength(2);
      expect(collection[0].slug).toBe('project-1');
    });

    it('should return correct collection for blog type', () => {
      const collection = getCollection('blog');
      expect(collection).toHaveLength(2);
      expect(collection[0].slug).toBe('blog-1');
    });
  });

  describe('getAllContent', () => {
    it('should return all content from all collections', () => {
      const allContent = getAllContent();
      expect(allContent).toHaveLength(4); // 2 projects + 2 blogs
    });

    it('should add type property to each item', () => {
      const allContent = getAllContent();

      const projects = allContent.filter(item => item.type === 'project');
      const blogs = allContent.filter(item => item.type === 'blog');

      expect(projects).toHaveLength(2);
      expect(blogs).toHaveLength(2);
    });

    it('should preserve original item properties', () => {
      const allContent = getAllContent();
      const project = allContent.find(item => item.slug === 'project-1');

      expect(project).toBeDefined();
      expect(project?.title).toBe('Project One');
      expect(project?.type).toBe('project');
    });
  });

  describe('getRecentContent', () => {
    it('should return content sorted by date (most recent first)', () => {
      const recent = getRecentContent(10);

      // blog-2 (2024-04-05) should be first
      expect(recent[0].slug).toBe('blog-2');
      // project-2 (2024-03-20) should be second
      expect(recent[1].slug).toBe('project-2');
    });

    it('should respect the limit parameter', () => {
      const recent = getRecentContent(3);
      expect(recent).toHaveLength(3);
    });

    it('should default to 4 items when no limit specified', () => {
      const recent = getRecentContent();
      expect(recent).toHaveLength(4);
    });

    it('should handle dates correctly for different content types', () => {
      const recent = getRecentContent(10);

      // Verify the content is properly typed
      recent.forEach(item => {
        expect(item.type).toBeDefined();
        expect(['project', 'blog']).toContain(item.type);
      });
    });
  });

  describe('getRelatedContent', () => {
    it('should filter out the current item', () => {
      const related = getRelatedContent('blog-1', 'blog', 10);
      const hasCurrentItem = related.some(item => item.slug === 'blog-1');

      expect(hasCurrentItem).toBe(false);
    });

    it('should only return items of the same type', () => {
      const related = getRelatedContent('blog-1', 'blog', 10);

      related.forEach(item => {
        expect(item.type).toBe('blog');
      });
    });

    it('should respect the limit parameter', () => {
      const related = getRelatedContent('project-1', 'project', 1);
      expect(related).toHaveLength(1);
    });

    it('should default to 3 items when no limit specified', () => {
      const related = getRelatedContent('blog-1', 'blog');
      expect(related.length).toBeLessThanOrEqual(3);
    });

    it('should sort by date (most recent first)', () => {
      const related = getRelatedContent('blog-1', 'blog', 10);

      // blog-2 should come before blog-1 would (if it weren't filtered)
      if (related.length > 0) {
        expect(related[0].slug).toBe('blog-2');
      }
    });
  });

  describe('getContentByYear', () => {
    it('should group content by year', () => {
      const byYear = getContentByYear();

      expect(byYear[2024]).toBeDefined();
      expect(byYear[2023]).toBeDefined();
    });

    it('should sort content within each year by date', () => {
      const byYear = getContentByYear();
      const year2024 = byYear[2024];

      // Most recent should be first
      expect(year2024[0].slug).toBe('blog-2'); // 2024-04-05
    });

    it('should filter by content type when specified', () => {
      const blogsByYear = getContentByYear('blog');

      Object.values(blogsByYear).forEach(yearContent => {
        yearContent.forEach(item => {
          expect('date' in item).toBe(true);
        });
      });
    });

    it('should include all types when no type specified', () => {
      const byYear = getContentByYear();
      const allItems = Object.values(byYear).flat();

      expect(allItems.length).toBe(4);
    });
  });

  describe('searchContent', () => {
    it('should search in blog/project titles', () => {
      const results = searchContent('Project One');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('project-1');
    });

    it('should search in blog/project descriptions', () => {
      const results = searchContent('First blog');

      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe('blog-1');
    });

    it('should be case insensitive', () => {
      const lowerResults = searchContent('project one');
      const upperResults = searchContent('PROJECT ONE');

      expect(lowerResults).toHaveLength(1);
      expect(upperResults).toHaveLength(1);
      expect(lowerResults[0].slug).toBe(upperResults[0].slug);
    });

    it('should filter by content type when specified', () => {
      const results = searchContent('project', 'project' as ContentType);

      results.forEach(item => {
        // Should only contain projects
        expect('startDate' in item).toBe(true);
      });
    });

    it('should search across all types when no type specified', () => {
      const results = searchContent('description');

      // Should find results from both projects and blogs
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array when no matches found', () => {
      const results = searchContent('nonexistent query xyz');

      expect(results).toHaveLength(0);
    });

    it('should handle partial matches', () => {
      const results = searchContent('proj');

      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('getContentStats', () => {
    it('should return correct count for each content type', () => {
      const stats = getContentStats();

      expect(stats.projects).toBe(2);
      expect(stats.blogs).toBe(2);
    });

    it('should return correct total count', () => {
      const stats = getContentStats();

      expect(stats.total).toBe(4);
    });

    it('should have all required properties', () => {
      const stats = getContentStats();

      expect(stats).toHaveProperty('projects');
      expect(stats).toHaveProperty('blogs');
      expect(stats).toHaveProperty('total');
    });

    it('should match snapshot', () => {
      const stats = getContentStats();
      expect(stats).toMatchSnapshot();
    });
  });
});
