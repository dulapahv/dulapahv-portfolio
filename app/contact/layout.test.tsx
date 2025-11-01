import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ContactLayout from './layout';

// Mock Footer component
vi.mock('@/components/footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
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

  it('should wrap footer in max-w-2xl container', () => {
    const { container } = render(
      <ContactLayout params={mockParams}>
        <div>Content</div>
      </ContactLayout>
    );

    const footerContainer = container.querySelector('.max-w-2xl');
    expect(footerContainer).toBeInTheDocument();
    expect(footerContainer).toHaveClass('mx-auto');
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
