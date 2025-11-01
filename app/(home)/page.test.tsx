import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Home from './page';

// Mock this as we want them to be consistent across snapshots
vi.mock('@/app/actions/gh-follower', () => ({
  getGitHubFollowers: vi.fn().mockResolvedValue('1')
}));

// Mock Globe because it uses complex canvas rendering
vi.mock('@/components/globe', () => ({
  Globe: () => <div>Globe</div>
}));

describe('Home Page', () => {
  it('should render main heading with greeting', async () => {
    const component = await Home();
    render(component);

    // Look for the main h1 that contains "Hello"
    const headings = screen.getAllByRole('heading', { level: 1 });
    const mainHeading = headings.find(h => h.textContent?.includes('Hello'));

    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading?.textContent).toContain('Hello');
    expect(mainHeading?.textContent).toContain("I'm Dulapah Vibulsanti");
  });

  it('should render social links', async () => {
    const component = await Home();
    render(component);

    // Check for specific aria-labels
    const linkedinLink = screen.getByRole('link', { name: /connect with me on linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github profile/i });

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });

  it('should render description text', async () => {
    const component = await Home();
    render(component);

    // The main heading contains this text
    const headings = screen.getAllByRole('heading', { level: 1 });
    const mainHeading = headings.find(h => h.textContent?.includes('Software Engineer'));

    expect(mainHeading).toBeInTheDocument();
  });

  it('should match snapshot', async () => {
    const component = await Home();
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
