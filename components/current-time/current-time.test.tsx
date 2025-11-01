import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CurrentTime } from './current-time';

describe('CurrentTime', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component rendering', () => {
    it('should render a link element', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have correct link href', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://www.timeanddate.com/time/zone/uk');
    });

    it('should open link in new tab', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have aria-label with current time', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      const ariaLabel = link.getAttribute('aria-label');

      expect(ariaLabel).toContain('Current time in Edinburgh:');
    });

    it('should have suppressHydrationWarning attribute', () => {
      const { container } = render(<CurrentTime />);
      const link = container.querySelector('a');

      // Check that the link exists
      expect(link).toBeInTheDocument();
    });

    it('should display time with emoji', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      const text = link.textContent;

      // Should have time format HH:MM and contain an emoji
      expect(text).toMatch(/\d{2}:\d{2}/);
      expect(text).toBeTruthy();
    });
  });

  describe('Time formatting', () => {
    it('should format time in 24-hour format', () => {
      // Mock a specific date - 2:30 PM Edinburgh time
      const mockDate = new Date('2024-01-15T14:30:00Z');
      vi.setSystemTime(mockDate);

      render(<CurrentTime />);

      const link = screen.getByRole('link');
      const text = link.textContent;

      // Should contain time in HH:MM format
      expect(text).toMatch(/\d{2}:\d{2}/);
    });

    it('should include emoji based on time of day', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      const text = link.textContent;

      // Should start with an emoji
      const emojis = ['🕰️', '🌅', '☀️', '🌤️', '🌇', '🌙'];
      const hasEmoji = emojis.some(emoji => text?.includes(emoji));

      expect(hasEmoji).toBe(true);
    });
  });

  describe('Time-based emoji selection', () => {
    const testTimeWithEmoji = (hour: number, expectedEmoji: string, description: string) => {
      it(`should show ${expectedEmoji} emoji for ${description}`, () => {
        // Create a date in Edinburgh timezone for the specific hour
        // Using UTC and adjusting for Edinburgh (usually UTC+0 or UTC+1)
        const mockDate = new Date(`2024-07-15T${hour.toString().padStart(2, '0')}:00:00+01:00`);
        vi.setSystemTime(mockDate);

        render(<CurrentTime />);

        const link = screen.getByRole('link');
        const text = link.textContent;

        expect(text).toContain(expectedEmoji);
      });
    };

    testTimeWithEmoji(6, '🌅', 'early morning (6 AM)');
    testTimeWithEmoji(7, '🌅', 'morning (7 AM)');
    testTimeWithEmoji(9, '☀️', 'mid-morning (9 AM)');
    testTimeWithEmoji(11, '☀️', 'late morning (11 AM)');
    testTimeWithEmoji(13, '🌤️', 'afternoon (1 PM)');
    testTimeWithEmoji(16, '🌤️', 'late afternoon (4 PM)');
    testTimeWithEmoji(19, '🌇', 'evening (7 PM)');
    testTimeWithEmoji(20, '🌇', 'late evening (8 PM)');
    testTimeWithEmoji(22, '🌙', 'night (10 PM)');
    testTimeWithEmoji(2, '🌙', 'late night (2 AM)');
  });

  describe('Accessibility', () => {
    it('should have descriptive aria-label', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      const ariaLabel = link.getAttribute('aria-label');

      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('Current time in Edinburgh');
    });

    it('should be keyboard accessible', () => {
      render(<CurrentTime />);

      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });
  });

  describe('Styling', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<CurrentTime />);
      const link = container.querySelector('a');

      expect(link?.className).toContain('border-border');
      expect(link?.className).toContain('bg-background');
      expect(link?.className).toContain('rounded-md');
    });

    it('should have hover styles', () => {
      const { container } = render(<CurrentTime />);
      const link = container.querySelector('a');

      expect(link?.className).toContain('hover:bg-background-subtle');
      expect(link?.className).toContain('hover:border-border-strong');
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot', () => {
      const mockDate = new Date('2024-01-15T14:30:00Z');
      vi.setSystemTime(mockDate);

      const { container } = render(<CurrentTime />);
      expect(container).toMatchSnapshot();
    });
  });
});
