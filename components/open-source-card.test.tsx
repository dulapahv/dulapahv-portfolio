import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { OpenSourceCard } from './open-source-card';

vi.mock('@/app/actions/GhOssContributions', () => ({
  getContributions: vi.fn().mockResolvedValue([
    {
      title: 'Add new feature',
      repository: 'owner/repo1',
      number: 123,
      url: 'https://github.com/owner/repo1/pull/123',
      type: 'PR' as const,
      status: 'MERGED' as const,
      date: new Date('2024-01-15')
    },
    {
      title: 'Fix bug in component',
      repository: 'owner/repo2',
      number: 456,
      url: 'https://github.com/owner/repo2/pull/456',
      type: 'PR' as const,
      status: 'OPEN' as const,
      date: new Date('2024-01-10')
    },
    {
      title: 'Update documentation',
      repository: 'owner/repo3',
      number: 789,
      url: 'https://github.com/owner/repo3/issues/789',
      type: 'ISSUE' as const,
      status: 'CLOSED' as const,
      date: new Date('2024-01-05')
    }
  ]),
  getContributionStats: vi.fn().mockResolvedValue({
    total: 3,
    merged: 1,
    open: 1,
    closed: 1,
    draft: 0
  })
}));

describe('OpenSourceCard', () => {
  it('should render open source contributions card with title', async () => {
    const component = await OpenSourceCard();
    render(component);

    expect(screen.getByText('Open Source Contributions')).toBeInTheDocument();
  });

  it('should display contribution stats', async () => {
    const component = await OpenSourceCard();
    const { container } = render(component);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('total')).toBeInTheDocument();
    expect(screen.getByText('merged')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();

    // Check for stats container
    const stats = container.querySelectorAll('.text-sm');
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should display recent contributions', async () => {
    const component = await OpenSourceCard();
    render(component);

    expect(screen.getByText('Add new feature')).toBeInTheDocument();
    expect(screen.getByText('Fix bug in component')).toBeInTheDocument();
    expect(screen.getByText('Update documentation')).toBeInTheDocument();
  });

  it('should show status badges for contributions', async () => {
    const component = await OpenSourceCard();
    render(component);

    expect(screen.getByText('Merged')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('should have link to GitHub profile', async () => {
    const component = await OpenSourceCard();
    render(component);

    const link = screen.getByTitle('View my GitHub profile');
    expect(link).toHaveAttribute('href', 'https://github.com/dulapahv');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should display repository names and PR/issue numbers', async () => {
    const component = await OpenSourceCard();
    render(component);

    expect(screen.getByText('owner/repo1')).toBeInTheDocument();
    expect(screen.getByText('#123')).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const component = await OpenSourceCard();
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
