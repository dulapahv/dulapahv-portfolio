import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ContactLayout from './layout';

vi.mock('@/components/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

describe('Contact Layout', () => {
  const mockParams = Promise.resolve({});

  it('should render children', () => {
    render(
      <ContactLayout params={mockParams}>
        <div data-testid="test-child">Contact Form</div>
      </ContactLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Contact Form')).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    render(
      <ContactLayout params={mockParams}>
        <div>Content</div>
      </ContactLayout>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <ContactLayout params={mockParams}>
        <h1>Contact Page</h1>
        <p>Get in touch</p>
      </ContactLayout>
    );

    expect(screen.getByText('Contact Page')).toBeInTheDocument();
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <ContactLayout params={mockParams}>
        <div>Contact Content</div>
      </ContactLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
