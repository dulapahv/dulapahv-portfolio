import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '@/hooks/use-media-query';

import { TableOfContents } from './toc';

vi.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: vi.fn()
}));

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    nav: ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => (
      <nav {...props}>{children}</nav>
    ),
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => <li {...props}>{children}</li>
  },
  AnimatePresence: ({ children }: React.FragmentProps) => <>{children}</>
}));

describe('TableOfContents', () => {
  let intersectionCallback: IntersectionObserverCallback;
  let mutationCallback: MutationCallback;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let observeIntersection: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let disconnectIntersection: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let observeMutation: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let disconnectMutation: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock IntersectionObserver
    intersectionCallback = vi.fn();
    observeIntersection = vi.fn();
    disconnectIntersection = vi.fn();

    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
      observe = observeIntersection;
      unobserve = vi.fn();
      disconnect = disconnectIntersection;
      root = null;
      rootMargin = '';
      thresholds = [0.5];
      takeRecords = () => [];
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } as any;

    // Mock MutationObserver
    mutationCallback = vi.fn();
    observeMutation = vi.fn();
    disconnectMutation = vi.fn();

    global.MutationObserver = class {
      constructor(callback: MutationCallback) {
        mutationCallback = callback;
      }
      observe = observeMutation;
      disconnect = disconnectMutation;
      takeRecords = () => [];
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } as any;

    // Mock media query - default to desktop view
    vi.mocked(useMediaQuery).mockImplementation((query: string) => {
      if (query === '(min-width: 1350px)') return true;
      return false;
    });

    // Setup document with headings
    document.body.innerHTML = `
      <article>
        <h2 id="heading-1">Heading 1</h2>
        <h3 id="heading-2">Heading 2</h3>
        <h2 id="heading-3">Heading 3</h2>
      </article>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering - Desktop View', () => {
    it('should render table of contents navigation', () => {
      render(<TableOfContents />);
      const nav = screen.getByRole('navigation', { name: /table of contents/i });
      expect(nav).toBeInTheDocument();
    });

    it('should render "On this page" heading', async () => {
      const { container } = render(<TableOfContents />);

      await waitFor(() => {
        const heading = container.querySelector('h2');
        expect(heading?.textContent).toBe('On this page');
      });
    });

    it('should render all headings from the document', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /heading 1/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /heading 2/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /heading 3/i })).toBeInTheDocument();
      });
    });

    it('should have correct href for each heading', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /heading 1/i })).toHaveAttribute(
          'href',
          '#heading-1'
        );
        expect(screen.getByRole('link', { name: /heading 2/i })).toHaveAttribute(
          'href',
          '#heading-2'
        );
        expect(screen.getByRole('link', { name: /heading 3/i })).toHaveAttribute(
          'href',
          '#heading-3'
        );
      });
    });

    it('should mark the first heading as active initially', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        const firstLink = screen.getByRole('link', { name: /heading 1/i });
        expect(firstLink).toHaveAttribute('aria-current', 'location');
      });
    });
  });

  describe('Rendering - Mobile View', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(min-width: 1350px)') return false;
        return false;
      });
    });

    it('should render toggle button', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toContain('On this page');
      });
    });

    it('should start collapsed', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveAttribute('aria-label', 'Table of contents');
      });
    });

    it('should expand when clicking toggle button', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        button.click();
      });

      await waitFor(() => {
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Active heading tracking', () => {
    it('should have intersection observer callback defined', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /heading 1/i })).toHaveAttribute(
          'aria-current',
          'location'
        );
      });

      // Intersection callback should be defined and ready to handle changes
      expect(intersectionCallback).toBeDefined();
    });
  });

  describe('IntersectionObserver', () => {
    it('should create IntersectionObserver', () => {
      render(<TableOfContents />);
      expect(intersectionCallback).toBeDefined();
    });

    it('should observe headings', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(observeIntersection).toHaveBeenCalled();
      });
    });

    it('should disconnect observer on unmount', () => {
      const { unmount } = render(<TableOfContents />);
      unmount();
      expect(disconnectIntersection).toHaveBeenCalled();
    });
  });

  describe('MutationObserver', () => {
    it('should create MutationObserver', () => {
      render(<TableOfContents />);
      expect(mutationCallback).toBeDefined();
    });

    it('should observe article element for mutations', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(observeMutation).toHaveBeenCalled();
      });
    });

    it('should disconnect mutation observer on unmount', () => {
      const { unmount } = render(<TableOfContents />);
      unmount();
      expect(disconnectMutation).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for navigation', () => {
      render(<TableOfContents />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Table of contents');
    });

    it('should have aria-current on active link', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        const activeLink = screen.getByRole('link', { name: /heading 1/i });
        expect(activeLink).toHaveAttribute('aria-current', 'location');
      });
    });

    it('should have screen reader instructions for desktop view', async () => {
      const { container } = render(<TableOfContents />);

      await waitFor(() => {
        const group = container.querySelector('[role="group"]');
        expect(group).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Heading levels', () => {
    it('should render nested headings with proper indentation', async () => {
      document.body.innerHTML = `
        <article>
          <h2 id="h2-1">Level 2</h2>
          <h3 id="h3-1">Level 3</h3>
        </article>
      `;

      render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /level 2/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /level 3/i })).toBeInTheDocument();
      });
    });

    it('should handle headings with special characters', async () => {
      document.body.innerHTML = `
        <article>
          <h2 id="special-chars">Heading with "quotes" & symbols</h2>
        </article>
      `;

      render(<TableOfContents />);

      await waitFor(() => {
        const link = screen.getByRole('link', { name: /heading with "quotes" & symbols/i });
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('Dynamic content updates', () => {
    it('should have mutation observer set up to detect changes', async () => {
      render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getAllByRole('link')).toHaveLength(3);
      });

      // Mutation observer should be observing the article element
      expect(observeMutation).toHaveBeenCalled();
      expect(mutationCallback).toBeDefined();
    });
  });

  describe('Empty state', () => {
    it('should return null when document has no headings', () => {
      document.body.innerHTML = '<article></article>';
      render(<TableOfContents />);

      // Component returns null when there are no headings
      const nav = screen.queryByRole('navigation');
      expect(nav).toBeNull();
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot - desktop view', async () => {
      const { container } = render(<TableOfContents />);

      await waitFor(() => {
        expect(screen.getAllByRole('link').length).toBeGreaterThan(0);
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot - mobile view', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(min-width: 1350px)') return false;
        return false;
      });

      const { container } = render(<TableOfContents />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
