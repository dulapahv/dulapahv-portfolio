import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactActions } from './contact-actions';

describe('ContactActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  it('should render contact buttons', () => {
    render(<ContactActions />);

    expect(screen.getByText('Copy Email')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('should copy email to clipboard when copy button is clicked', async () => {
    render(<ContactActions />);

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('@'));
    });

    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('should show copied state after clicking', async () => {
    render(<ContactActions />);

    const copyButton = screen.getByRole('button', { name: /copy email/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('should render GitHub link with correct href', () => {
    render(<ContactActions />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('should render LinkedIn link with correct href', () => {
    render(<ContactActions />);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });
});
