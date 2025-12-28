import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TypeLayout from './layout';

vi.mock('@/components/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

describe('Type Layout', () => {
  const mockParams = Promise.resolve({ type: 'blog' });

  it('should render children', () => {
    render(
      <TypeLayout params={mockParams}>
        <div data-testid="test-child">Test Content</div>
      </TypeLayout>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    render(
      <TypeLayout params={mockParams}>
        <div>Content</div>
      </TypeLayout>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render different children', () => {
    const { rerender } = render(
      <TypeLayout params={mockParams}>
        <div>Blog Content</div>
      </TypeLayout>
    );

    expect(screen.getByText('Blog Content')).toBeInTheDocument();

    rerender(
      <TypeLayout params={Promise.resolve({ type: 'blog' })}>
        <div>Blog Content</div>
      </TypeLayout>
    );

    expect(screen.getByText('Blog Content')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(
      <TypeLayout params={mockParams}>
        <div>Test Content</div>
      </TypeLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
