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
