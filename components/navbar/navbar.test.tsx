import { usePathname } from 'next/navigation';

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Navbar } from './navbar';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn()
}));

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render navigation element', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('should render all navigation items', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /project/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
    });

    it('should have correct href attributes', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /project/i })).toHaveAttribute('href', '/project');
      expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog');
      expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    });
  });

  describe('Active state', () => {
    it('should mark home as active when on home page', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const homeLink = screen.getByRole('link', { name: /home.*current/i });
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark project as active when on project page', () => {
      vi.mocked(usePathname).mockReturnValue('/project');
      render(<Navbar />);

      const projectLink = screen.getByRole('link', { name: /project.*current/i });
      expect(projectLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark blog as active when on blog page', () => {
      vi.mocked(usePathname).mockReturnValue('/blog');
      render(<Navbar />);

      const blogLink = screen.getByRole('link', { name: /blog.*current/i });
      expect(blogLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark contact as active when on contact page', () => {
      vi.mocked(usePathname).mockReturnValue('/contact');
      render(<Navbar />);

      const contactLink = screen.getByRole('link', { name: /contact.*current/i });
      expect(contactLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark blog as active when on blog detail page', () => {
      vi.mocked(usePathname).mockReturnValue('/blog/some-post');
      render(<Navbar />);

      const blogLink = screen.getByRole('link', { name: /blog.*current/i });
      expect(blogLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Keyboard navigation', () => {
    it('should handle ArrowRight key navigation', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus first link
      links[0].focus();
      expect(document.activeElement).toBe(links[0]);

      // Press ArrowRight
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      expect(document.activeElement).toBe(links[1]);
    });

    it('should handle ArrowLeft key navigation', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus second link
      links[1].focus();
      expect(document.activeElement).toBe(links[1]);

      // Press ArrowLeft
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      expect(document.activeElement).toBe(links[0]);
    });

    it('should wrap around to last link when pressing ArrowLeft on first link', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus first link
      links[0].focus();

      // Press ArrowLeft (should wrap to last)
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      expect(document.activeElement).toBe(links[links.length - 1]);
    });

    it('should wrap around to first link when pressing ArrowRight on last link', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus last link
      links[links.length - 1].focus();

      // Press ArrowRight (should wrap to first)
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      expect(document.activeElement).toBe(links[0]);
    });

    it('should handle Home key to focus first link', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus last link
      links[links.length - 1].focus();

      // Press Home
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      expect(document.activeElement).toBe(links[0]);
    });

    it('should handle End key to focus last link', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      // Focus first link
      links[0].focus();

      // Press End
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      expect(document.activeElement).toBe(links[links.length - 1]);
    });

    it('should handle ArrowDown key navigation', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      links[0].focus();
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      expect(document.activeElement).toBe(links[1]);
    });

    it('should handle ArrowUp key navigation', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      const links = screen.getAllByRole('link');

      links[1].focus();
      nav.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      expect(document.activeElement).toBe(links[0]);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for navigation', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('should have screen reader instructions', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      const { container } = render(<Navbar />);

      const instructions = container.querySelector('[aria-live="polite"]');
      expect(instructions).toBeInTheDocument();
      expect(instructions?.textContent).toContain('arrow keys');
    });

    it('should include current page indicator for screen readers', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      const { container } = render(<Navbar />);

      const srOnly = container.querySelector('.sr-only');
      expect(srOnly?.textContent).toContain('current page');
    });

    it('should have descriptive aria-labels for each link', () => {
      vi.mocked(usePathname).mockReturnValue('/work');
      render(<Navbar />);

      const workLink = screen.getByRole('link', { name: /work.*current page/i });
      expect(workLink).toHaveAttribute('aria-label');
    });
  });

  describe('Styling', () => {
    it('should apply active styling to current page link', () => {
      vi.mocked(usePathname).mockReturnValue('/project');
      render(<Navbar />);

      const projectLink = screen.getByRole('link', { name: /project.*current/i });
      expect(projectLink.className).toContain('text-mirai-red');
      expect(projectLink.className).toContain('border-mirai-red');
    });

    it('should apply hover styling classes', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      render(<Navbar />);

      const workLink = screen.getByRole('link', { name: /^work$/i });
      expect(workLink.className).toContain('hover:text-foreground-muted');
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot on home page', () => {
      vi.mocked(usePathname).mockReturnValue('/');
      const { container } = render(<Navbar />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot on blog page', () => {
      vi.mocked(usePathname).mockReturnValue('/blog');
      const { container } = render(<Navbar />);
      expect(container).toMatchSnapshot();
    });
  });
});
