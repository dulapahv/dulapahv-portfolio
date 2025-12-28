import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import GlobalError from './global-error';

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

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: string | boolean | number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  )
}));

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({
    theme: 'system',
    setTheme: vi.fn(),
    themes: ['light', 'dark', 'system'],
    systemTheme: 'light',
    resolvedTheme: 'light',
    forcedTheme: undefined
  })
}));

vi.mock('geist/font/mono', () => ({
  GeistMono: {
    variable: 'geist-mono-variable',
    className: 'geist-mono'
  }
}));

vi.mock('next/font/google', () => ({
  Raleway: () => ({
    className: 'raleway-font',
    style: { fontFamily: 'Raleway' }
  }),
  Archivo: () => ({
    className: 'mocked-archivo'
  })
}));

describe('Global Error Page', () => {
  const mockError = {
    name: 'CriticalError',
    message: 'This is a critical test error',
    digest: 'def456',
    cause: 'Critical test cause',
    stack: 'Error stack trace here'
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

  it('should render critical error heading', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(screen.getByRole('heading', { name: 'Critical Error' })).toBeInTheDocument();
  });

  it('should render error message with contact link', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(
      screen.getByText(/A critical error occurred and the application could not recover/i)
    ).toBeInTheDocument();

    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', expect.stringContaining('/contact'));
  });

  it('should render try again button', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('should call reset function when try again button is clicked', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should display error details', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText(/Details:/i)).toBeInTheDocument();
    expect(screen.getByText(/Name: CriticalError/i)).toBeInTheDocument();
    expect(screen.getByText(/Message: This is a critical test error/i)).toBeInTheDocument();
    expect(screen.getByText(/Cause: Critical test cause/i)).toBeInTheDocument();
    expect(screen.getByText(/Digest: def456/i)).toBeInTheDocument();
  });

  it('should log error to console on mount', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it('should handle error without optional fields', () => {
    const minimalError = {
      name: '',
      message: ''
    } as Error & { digest?: string };

    render(<GlobalError error={minimalError} reset={mockReset} />);

    expect(screen.getByText(/Name: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Message: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Cause: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Digest: N\/A/i)).toBeInTheDocument();
  });

  it('should render decorative background images', () => {
    const { container } = render(<GlobalError error={mockError} reset={mockReset} />);
    const images = container.querySelectorAll('[role="presentation"]');
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it('should render with proper html-like structure', () => {
    const { container } = render(<GlobalError error={mockError} reset={mockReset} />);

    // Instead of looking for <html>/<body>, verify top-level layout
    const mainContent = container.querySelector('#main-content');
    expect(mainContent).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /critical error/i });
    expect(heading).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<GlobalError error={mockError} reset={mockReset} />);
    expect(container).toMatchSnapshot();
  });
});
