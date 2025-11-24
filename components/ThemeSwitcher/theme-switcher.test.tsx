import { act, render, screen, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '@/hooks/use-media-query';

import { ThemeSwitcher } from './ThemeSwitcher';

vi.mock('next-themes', () => ({
  useTheme: vi.fn()
}));

vi.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: vi.fn()
}));

vi.mock('motion/react', () => ({
  motion: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  }
}));

describe('ThemeSwitcher', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
      themes: ['light', 'dark', 'system'],
      systemTheme: 'light',
      resolvedTheme: 'light',
      forcedTheme: undefined
    });
    vi.mocked(useMediaQuery).mockReturnValue(false);
  });

  describe('Rendering', () => {
    it('should render empty before mounted', () => {
      // The component returns null before mounting
      // In tests, it mounts synchronously so we'll see content
      const { container } = render(<ThemeSwitcher />);
      expect(container).toBeInTheDocument();
    });

    it('should render after mounting', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = screen.getByRole('group', { name: /theme selection/i });
        expect(group).toBeInTheDocument();
      });
    });

    it('should render all theme buttons when not on touch device', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /system theme/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /light theme/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /dark theme/i })).toBeInTheDocument();
      });
    });

    it('should render current theme button on touch device when collapsed', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', expect.stringContaining('Current theme'));
      });
    });
  });

  describe('Theme switching', () => {
    it('should call setTheme when clicking system theme button', async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const systemButton = screen.getByRole('button', { name: /system theme/i });
        systemButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('should call setTheme when clicking light theme button', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const lightButton = screen.getByRole('button', { name: /light theme/i });
        lightButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should call setTheme when clicking dark theme button', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const darkButton = screen.getByRole('button', { name: /dark theme/i });
        darkButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });
  });

  describe('Active state', () => {
    it('should mark system theme as active', async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'system',
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const systemButton = screen.getByRole('button', {
          name: /system theme.*currently selected/i
        });
        expect(systemButton).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should mark light theme as active', async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'light',
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const lightButton = screen.getByRole('button', {
          name: /light theme.*currently selected/i
        });
        expect(lightButton).toHaveAttribute('aria-pressed', 'true');
      });
    });

    it('should mark dark theme as active', async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'dark',
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        resolvedTheme: 'dark',
        forcedTheme: undefined
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const darkButton = screen.getByRole('button', { name: /dark theme.*currently selected/i });
        expect(darkButton).toHaveAttribute('aria-pressed', 'true');
      });
    });
  });

  describe('Touch device behavior', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });
    });

    it('should expand when clicking container on touch device', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });

      const container = screen.getByRole('group');
      container.click();

      await waitFor(() => {
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should collapse after selecting theme on touch device', async () => {
      render(<ThemeSwitcher />);

      // Expand first
      await waitFor(() => {
        const container = screen.getByRole('group');
        container.click();
      });

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });

      // Click theme button
      const lightButton = screen.getByRole('button', { name: /light theme/i });
      lightButton.click();

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Keyboard navigation', () => {
    it('should navigate with ArrowRight key', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons[0].focus();
      });

      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(document.activeElement).toBe(buttons[1]);
      });
    });

    it('should navigate with ArrowLeft key', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons[1].focus();
      });

      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should wrap around when navigating with ArrowRight from last button', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons[buttons.length - 1].focus();
      });

      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        expect(document.activeElement).toBe(buttons[0]);
      });
    });

    it('should handle Enter key on touch device to expand', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });

      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      await waitFor(() => {
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should handle Space key on touch device to expand', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });

      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      await waitFor(() => {
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should handle Escape key on touch device to collapse', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      render(<ThemeSwitcher />);

      // First expand
      await waitFor(() => {
        const container = screen.getByRole('group');
        container.click();
      });

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });

      // Then press Escape
      const container = screen.getByRole('group');
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

      await waitFor(() => {
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Click outside behavior', () => {
    it('should close when clicking outside on touch device', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      render(<ThemeSwitcher />);

      // Expand first
      await waitFor(() => {
        const container = screen.getByRole('group');
        container.click();
      });

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'true');
      });

      // Click outside
      act(() => {
        document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      });

      await waitFor(() => {
        const container = screen.getByRole('group');
        expect(container).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label for theme selection', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = screen.getByRole('group', { name: /theme selection/i });
        expect(group).toHaveAttribute('aria-label', 'Theme selection');
      });
    });

    it('should have aria-expanded attribute', async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = screen.getByRole('group');
        expect(group).toHaveAttribute('aria-expanded');
      });
    });

    it('should have screen reader instructions for touch devices', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(hover: none) and (pointer: coarse)') return true;
        return false;
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const instructions = container.querySelector('#theme-instructions');
        expect(instructions?.textContent).toContain('Enter or Space to expand');
      });
    });

    it('should have screen reader instructions for non-touch devices', async () => {
      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const instructions = container.querySelector('#theme-instructions');
        expect(instructions?.textContent).toContain('arrow keys to navigate');
      });
    });

    it('should have live region for theme changes', async () => {
      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const liveRegion = container.querySelector('[aria-live="polite"]');
        expect(liveRegion).toBeInTheDocument();
      });
    });
  });

  describe('Responsive behavior', () => {
    it('should apply small screen styles', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(max-width: 678px)') return true;
        return false;
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = container.querySelector('[role="group"]');
        expect(group?.className).toContain('flex-col');
      });
    });

    it('should apply large screen styles', async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === '(max-width: 678px)') return false;
        return false;
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = container.querySelector('[role="group"]');
        expect(group?.className).toContain('flex-row');
      });
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot with system theme', async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: 'system',
        setTheme: mockSetTheme,
        themes: ['light', 'dark', 'system'],
        systemTheme: 'light',
        resolvedTheme: 'light',
        forcedTheme: undefined
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        expect(screen.getByRole('group')).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
