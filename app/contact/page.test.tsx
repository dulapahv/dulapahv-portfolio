import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ContactPage from './page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/contact'
}));

// Mock the sendContactEmail action
vi.mock('@/app/actions/contact', () => ({
  sendContactEmail: vi.fn()
}));

describe('Contact Page', () => {
  it('should render the contact page with title and description', async () => {
    const searchParams = Promise.resolve({});
    const component = await ContactPage({ params: Promise.resolve({}), searchParams });
    const { container } = render(component);

    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Let me know what's on your mind and I'll get back to you as soon as possible."
      )
    ).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const searchParams = Promise.resolve({});
    const component = await ContactPage({ params: Promise.resolve({}), searchParams });
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });
});
