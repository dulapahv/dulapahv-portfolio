import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

// Mock Date BEFORE any imports happen (using vi.hoisted)
// This ensures JSON-LD schemas and other module-level code use the mocked date
vi.hoisted(() => {
  const mockDate = new Date('2007-01-09T09:41:00.000Z');
  vi.setSystemTime(mockDate);
});

// Mock React's ViewTransition component
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    ViewTransition: ({ children }: React.PropsWithChildren) => <div>{children}</div>
  };
});

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Merriweather: () => ({
    className: 'mocked-merriweather'
  })
}));

// Mock react-medium-image-zoom to avoid random IDs in snapshots
vi.mock('react-medium-image-zoom', () => ({
  default: ({ children }: React.PropsWithChildren) => (
    <span data-testid="zoom-wrapper">{children}</span>
  )
}));

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  scrollMargin = '';
  thresholds = [];
  constructor() {}
};

// Mock matchMedia
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
}
