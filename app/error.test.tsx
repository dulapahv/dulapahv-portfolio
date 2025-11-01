import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Error from './error';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  )
}));

// Mock Footer component
vi.mock('@/components/footer', () => ({
  default: () => <footer>Footer</footer>
}));

describe('Error Page', () => {
  const mockError = {
    name: 'TestError',
    message: 'This is a test error',
    digest: 'abc123',
    cause: 'Test cause'
  } as Error & { digest?: string };

  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render error heading', () => {
    render(<Error error={mockError} reset={mockReset} />);
    expect(screen.getByRole('heading', { name: 'Oops! Something Went Wrong' })).toBeInTheDocument();
  });

  it('should render error message with contact link', () => {
    render(<Error error={mockError} reset={mockReset} />);
    expect(screen.getByText(/An error occurred while rendering this page/i)).toBeInTheDocument();

    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', expect.stringContaining('/contact'));
  });

  it('should render try again button', () => {
    render(<Error error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('should call reset function when try again button is clicked', () => {
    render(<Error error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should display error details', () => {
    render(<Error error={mockError} reset={mockReset} />);

    expect(screen.getByText(/Details:/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: TestError/i)).toBeInTheDocument();
    expect(screen.getByText(/Message: This is a test error/i)).toBeInTheDocument();
    expect(screen.getByText(/Cause: Test cause/i)).toBeInTheDocument();
    expect(screen.getByText(/Digest: abc123/i)).toBeInTheDocument();
  });

  it('should log error to console on mount', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    render(<Error error={mockError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it('should handle error without optional fields', () => {
    const minimalError = {
      name: '',
      message: ''
    } as Error & { digest?: string };

    render(<Error error={minimalError} reset={mockReset} />);

    expect(screen.getByText(/Name: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Message: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Cause: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Digest: N\/A/i)).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    render(<Error error={mockError} reset={mockReset} />);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Error error={mockError} reset={mockReset} />);
    expect(container).toMatchSnapshot();
  });
});
