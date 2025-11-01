import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TypeListingPage from './page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/project'
}));

// Mock content utilities with sample data
vi.mock('@/lib/content-utils', () => ({
  contentConfig: {
    project: {
      title: 'Projects',
      description: 'My projects',
      label: 'Project'
    },
    blog: {
      title: 'Blog',
      description: 'My blog posts',
      label: 'Blog'
    },
    work: {
      title: 'Work',
      description: 'My work experience',
      label: 'Work'
    }
  },
  isValidContentType: (type: string) => ['project', 'blog', 'work'].includes(type),
  getContentByYear: vi.fn(() => ({
    '2024': [
      {
        _meta: { path: 'test-project' },
        slug: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        startDate: new Date('2024-01-01')
      }
    ]
  })),
  getCollection: vi.fn(() => [
    {
      _meta: { path: 'test-project' },
      slug: 'test-project',
      title: 'Test Project',
      description: 'A test project',
      startDate: new Date('2024-01-01')
    }
  ])
}));

describe('Type Listing Page', () => {
  it('should render project listing and match snapshot', async () => {
    const component = await TypeListingPage({
      params: Promise.resolve({ type: 'project' }),
      searchParams: Promise.resolve({})
    });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it('should render blog listing and match snapshot', async () => {
    const component = await TypeListingPage({
      params: Promise.resolve({ type: 'blog' }),
      searchParams: Promise.resolve({})
    });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it('should render work listing and match snapshot', async () => {
    const component = await TypeListingPage({
      params: Promise.resolve({ type: 'work' }),
      searchParams: Promise.resolve({})
    });
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
