import { describe, expect, it, vi } from 'vitest';

import { BASE_URL } from '@/lib/constants';

import sitemap from './sitemap';

// Mock the content-utils module
vi.mock('@/lib/content-utils', () => ({
  getCollection: vi.fn((type: string) => {
    if (type === 'blog') {
      return [
        {
          _meta: { path: 'test-blog-post' },
          date: new Date('2024-01-15')
        }
      ];
    }
    if (type === 'work') {
      return [
        {
          _meta: { path: 'test-work' },
          startDate: new Date('2023-01-01'),
          endDate: new Date('2024-01-01')
        },
        {
          _meta: { path: 'ongoing-work' },
          startDate: new Date('2024-06-01')
          // No endDate - ongoing
        }
      ];
    }
    if (type === 'project') {
      return [
        {
          _meta: { path: 'test-project' },
          startDate: new Date('2023-05-01'),
          endDate: new Date('2023-08-01')
        }
      ];
    }
    return [];
  })
}));

describe('sitemap', () => {
  it('should return an array of sitemap entries', () => {
    const result = sitemap();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should include static pages', () => {
    const result = sitemap();

    const homePage = result.find(entry => entry.url === BASE_URL);
    const contactPage = result.find(entry => entry.url.includes('/contact'));

    expect(homePage).toBeDefined();
    expect(contactPage).toBeDefined();

    if (homePage) {
      expect(homePage.priority).toBe(1);
      expect(homePage.changeFrequency).toBe('monthly');
    }

    if (contactPage) {
      expect(contactPage.priority).toBe(0.8);
      expect(contactPage.changeFrequency).toBe('yearly');
    }
  });

  it('should include type listing pages', () => {
    const result = sitemap();

    const workPage = result.find(entry => entry.url.endsWith('/work'));
    const projectPage = result.find(entry => entry.url.endsWith('/project'));
    const blogPage = result.find(entry => entry.url.endsWith('/blog'));

    expect(workPage).toBeDefined();
    expect(projectPage).toBeDefined();
    expect(blogPage).toBeDefined();

    [workPage, projectPage, blogPage].forEach(page => {
      if (page) {
        expect(page.priority).toBe(0.7);
      }
    });
  });

  it('should include dynamic content pages', () => {
    const result = sitemap();

    const blogPost = result.find(entry => entry.url.includes('/blog/test-blog-post'));
    const workItem = result.find(entry => entry.url.includes('/work/test-work'));
    const projectItem = result.find(entry => entry.url.includes('/project/test-project'));

    expect(blogPost).toBeDefined();
    expect(workItem).toBeDefined();
    expect(projectItem).toBeDefined();
  });

  it('should set correct priorities for content types', () => {
    const result = sitemap();

    const blogPost = result.find(entry => entry.url.includes('/blog/test-blog-post'));
    const projectItem = result.find(entry => entry.url.includes('/project/test-project'));

    if (blogPost) {
      expect(blogPost.priority).toBe(0.5);
    }

    if (projectItem) {
      expect(projectItem.priority).toBe(0.6);
    }
  });

  it('should set correct change frequency for ongoing work', () => {
    const result = sitemap();

    const ongoingWork = result.find(entry => entry.url.includes('/work/ongoing-work'));
    const completedWork = result.find(entry => entry.url.includes('/work/test-work'));

    if (ongoingWork) {
      expect(ongoingWork.changeFrequency).toBe('monthly');
    }

    if (completedWork) {
      expect(completedWork.changeFrequency).toBe('yearly');
    }
  });

  it('should use correct lastModified dates', () => {
    const result = sitemap();

    const blogPost = result.find(entry => entry.url.includes('/blog/test-blog-post'));
    const workItem = result.find(entry => entry.url.includes('/work/test-work'));

    if (blogPost) {
      expect(blogPost.lastModified).toEqual(new Date('2024-01-15'));
    }

    if (workItem) {
      expect(workItem.lastModified).toEqual(new Date('2024-01-01'));
    }
  });

  it('should have required properties for all entries', () => {
    const result = sitemap();

    result.forEach(entry => {
      expect(entry.url).toBeDefined();
      expect(typeof entry.url).toBe('string');
      expect(entry.lastModified).toBeDefined();
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry.changeFrequency).toBeDefined();
      expect(entry.priority).toBeDefined();
      expect(typeof entry.priority).toBe('number');
    });
  });

  it('should match snapshot', () => {
    const result = sitemap();
    expect(result).toMatchSnapshot();
  });
});
