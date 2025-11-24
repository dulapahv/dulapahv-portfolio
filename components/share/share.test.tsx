import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ShareButtons } from './share';

vi.mock('./theme-aware-image', () => ({
  ThemeAwareImage: () => <div data-testid="theme-aware-image">X Logo</div>
}));

describe('ShareButtons', () => {
  const mockClipboard = {
    writeText: vi.fn()
  };

  beforeEach(() => {
    // Setup window mocks
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/test',
        pathname: '/test',
        origin: 'https://example.com'
      },
      writable: true
    });

    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true
    });

    Object.defineProperty(document, 'title', {
      value: 'Test Page Title',
      writable: true
    });

    // Mock window.open
    global.window.open = vi.fn();

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Native Share Support', () => {
    it('should show native share button when navigator.share is available', () => {
      Object.defineProperty(navigator, 'share', {
        value: vi.fn(),
        writable: true,
        configurable: true
      });

      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(() => true),
        writable: true,
        configurable: true
      });

      const { rerender } = render(<ShareButtons />);
      rerender(<ShareButtons />);

      const shareButton = screen.queryByTitle('Share this page');
      expect(shareButton).toBeInTheDocument();
    });

    it('should show copy link button when navigator.share is not available', () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      expect(copyButton).toBeInTheDocument();
    });

    it('should call navigator.share when native share button is clicked', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
        configurable: true
      });

      render(<ShareButtons />);

      const shareButton = screen.getByTitle('Share this page');
      fireEvent.click(shareButton);

      await waitFor(() => {
        expect(mockShare).toHaveBeenCalledWith({
          title: 'Test Page Title',
          url: 'https://example.com/test'
        });
      });
    });

    it('should fall back to copy when navigator.share fails with non-AbortError', async () => {
      const mockShare = vi.fn().mockRejectedValue(new Error('Share failed'));
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
        configurable: true
      });

      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ShareButtons />);

      const shareButton = screen.getByTitle('Share this page');
      fireEvent.click(shareButton);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('https://example.com/test');
      });
    });

    it('should not fall back to copy when navigator.share is aborted', async () => {
      const abortError = new Error('User aborted');
      abortError.name = 'AbortError';
      const mockShare = vi.fn().mockRejectedValue(abortError);
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
        configurable: true
      });

      render(<ShareButtons />);

      const shareButton = screen.getByTitle('Share this page');
      fireEvent.click(shareButton);

      await waitFor(() => {
        expect(mockShare).toHaveBeenCalled();
      });

      expect(mockClipboard.writeText).not.toHaveBeenCalled();
    });
  });

  describe('Copy to Clipboard', () => {
    it('should copy link to clipboard when copy button is clicked', async () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalledWith('https://example.com/test');
      });
    });

    it('should show "Link copied!" message after successful copy', async () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(screen.getByTitle('Link copied!')).toBeInTheDocument();
      });
    });

    it('should use fallback copy method when clipboard API fails', async () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
      mockClipboard.writeText.mockRejectedValue(new Error('Clipboard API failed'));

      // Mock document.execCommand
      document.execCommand = vi.fn().mockReturnValue(true);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(document.execCommand).toHaveBeenCalledWith('copy');
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Social Media Sharing', () => {
    beforeEach(() => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
    });

    it('should open X share popup when X button is clicked', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      render(<ShareButtons />);

      const xButton = screen.getByTitle('Share on X');
      fireEvent.click(xButton);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('https://x.com/intent/tweet'),
        expect.any(String),
        expect.any(String)
      );
    });

    it('should open Facebook share popup when Facebook button is clicked', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      render(<ShareButtons />);

      const facebookButton = screen.getByTitle('Share on Facebook');
      fireEvent.click(facebookButton);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('https://www.facebook.com/sharer'),
        expect.any(String),
        expect.any(String)
      );
    });

    it('should open LinkedIn share popup when LinkedIn button is clicked', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      render(<ShareButtons />);

      const linkedInButton = screen.getByTitle('Share on LinkedIn');
      fireEvent.click(linkedInButton);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('https://www.linkedin.com/sharing/share-offsite'),
        expect.any(String),
        expect.any(String)
      );
    });

    it('should reuse existing popup window if not closed', () => {
      const mockPopup = {
        closed: false,
        focus: vi.fn(),
        location: { href: '' }
      };
      const mockOpen = vi.fn().mockReturnValue(mockPopup);
      window.open = mockOpen;

      render(<ShareButtons />);

      const xButton = screen.getByTitle('Share on X');

      // First click
      fireEvent.click(xButton);
      expect(mockOpen).toHaveBeenCalledTimes(1);

      // Second click - should reuse popup
      fireEvent.click(xButton);
      expect(mockOpen).toHaveBeenCalledTimes(1);
      expect(mockPopup.focus).toHaveBeenCalled();
    });
  });

  describe('Copy Page as Markdown', () => {
    it('should show copy page button when page prop is provided', () => {
      const page = {
        title: 'Test Page',
        description: 'Test Description',
        content: 'Test Content',
        type: 'blog'
      };

      render(<ShareButtons page={page} />);

      expect(screen.getByText('Copy Page')).toBeInTheDocument();
    });

    it('should not show copy page button when page prop is not provided', () => {
      render(<ShareButtons />);

      expect(screen.queryByText('Copy Page')).not.toBeInTheDocument();
    });

    it('should fetch and copy markdown when copy page button is clicked', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: async () => '# Test Markdown'
      });

      mockClipboard.writeText.mockResolvedValue(undefined);

      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      const copyPageButton = screen.getByText('Copy Page');
      fireEvent.click(copyPageButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('https://example.com/test.md');
        expect(mockClipboard.writeText).toHaveBeenCalledWith('# Test Markdown');
      });
    });

    it('should show "Copied!" message after successful markdown copy', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: async () => '# Test Markdown'
      });

      mockClipboard.writeText.mockResolvedValue(undefined);

      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      const copyPageButton = screen.getByText('Copy Page');
      fireEvent.click(copyPageButton);

      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument();
      });
    });

    it('should handle fetch error gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      const copyPageButton = screen.getByText('Copy Page');
      fireEvent.click(copyPageButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Dropdown Menu', () => {
    it('should toggle dropdown when dropdown button is clicked', () => {
      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      const dropdownButton = screen.getByTitle('More options');

      // Dropdown should not be visible initially
      expect(screen.queryByText('View as Markdown')).not.toBeInTheDocument();

      // Click to open
      fireEvent.click(dropdownButton);
      expect(screen.getByText('View as Markdown')).toBeInTheDocument();

      // Click to close
      fireEvent.click(dropdownButton);
      expect(screen.queryByText('View as Markdown')).not.toBeInTheDocument();
    });

    it('should open markdown in new tab when "View as Markdown" is clicked', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      // Open dropdown
      const dropdownButton = screen.getByTitle('More options');
      fireEvent.click(dropdownButton);

      // Click View as Markdown
      const viewMarkdownButton = screen.getByText('View as Markdown');
      fireEvent.click(viewMarkdownButton);

      expect(mockOpen).toHaveBeenCalledWith('/test.md', '_blank');
    });

    it('should open NLWeb Chat when "Ask in NLWeb Chat" is clicked', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;

      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      // Open dropdown
      const dropdownButton = screen.getByTitle('More options');
      fireEvent.click(dropdownButton);

      // Click Ask in NLWeb Chat
      const nlwebButton = screen.getByText('Ask in NLWeb Chat');
      fireEvent.click(nlwebButton);

      expect(mockOpen).toHaveBeenCalledWith('https://chat.dulapahv.dev', '_blank');
    });

    it('should close dropdown when clicking outside', () => {
      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      // Open dropdown
      const dropdownButton = screen.getByTitle('More options');
      fireEvent.click(dropdownButton);
      expect(screen.getByText('View as Markdown')).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);
      expect(screen.queryByText('View as Markdown')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle Enter key on copy button', async () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      fireEvent.keyDown(copyButton, { key: 'Enter' });

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalled();
      });
    });

    it('should handle Space key on copy button', async () => {
      // @ts-expect-error - deliberately testing without share support
      delete navigator.share;
      mockClipboard.writeText.mockResolvedValue(undefined);

      render(<ShareButtons />);

      const copyButton = screen.getByTitle('Copy link to clipboard');
      fireEvent.keyDown(copyButton, { key: ' ' });

      await waitFor(() => {
        expect(mockClipboard.writeText).toHaveBeenCalled();
      });
    });

    it('should handle Escape key to close dropdown', () => {
      const page = {
        title: 'Test Page',
        content: 'Test Content'
      };

      render(<ShareButtons page={page} />);

      const dropdownButton = screen.getByTitle('More options');
      fireEvent.click(dropdownButton);

      // Dropdown should be open
      expect(screen.getByText('View as Markdown')).toBeInTheDocument();

      // Press Escape
      fireEvent.keyDown(dropdownButton, { key: 'Escape' });

      // Dropdown should be closed
      expect(screen.queryByText('View as Markdown')).not.toBeInTheDocument();
    });
  });
});
