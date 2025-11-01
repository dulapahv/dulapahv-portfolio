import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ContactForm } from './form';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn()
  }),
  usePathname: () => '/contact'
}));

// Mock the sendContactEmail action
vi.mock('@/app/actions/contact', () => ({
  sendContactEmail: vi.fn()
}));

describe('ContactForm', () => {
  it('should pass search params to form component', () => {
    const searchParams = {
      name: 'Dulapah',
      email: 'dulapah@example.com',
      message: 'Test message'
    };

    render(<ContactForm searchParams={searchParams} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    expect(nameInput.value).toBe('Dulapah');
    expect(emailInput.value).toBe('dulapah@example.com');
    expect(messageInput.value).toBe('Test message');
  });
});
