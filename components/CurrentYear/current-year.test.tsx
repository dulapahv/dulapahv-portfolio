import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CurrentYear } from './CurrentYear';

describe('CurrentYear', () => {
  it('should render the current year', () => {
    const currentYear = new Date().getFullYear();
    render(<CurrentYear />);

    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });

  it('should render correct year when mocked', () => {
    const mockDate = new Date('2025-11-01');
    vi.setSystemTime(mockDate);

    const { rerender } = render(<CurrentYear />);
    expect(screen.getByText('2025')).toBeInTheDocument();

    vi.useRealTimers();
    rerender(<CurrentYear />);
  });

  it('should match snapshot', () => {
    const { container } = render(<CurrentYear />);
    expect(container).toMatchSnapshot();
  });
});
