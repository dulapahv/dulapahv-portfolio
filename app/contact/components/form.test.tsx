import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useOnLeavePageConfirmation } from '@/hooks/use-on-leave-page-confirmation';

import { ContactForm } from './form';

// Mock dependencies
vi.mock('@/hooks/use-on-leave-page-confirmation', () => ({
  useOnLeavePageConfirmation: vi.fn()
}));

vi.mock('@/app/actions/contact', () => ({
  sendContactEmail: vi.fn()
}));

// Mock Turnstile
vi.mock('@marsidev/react-turnstile', () => ({
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  Turnstile: ({ onSuccess }: any) => (
    <div
      data-testid="turnstile-mock"
      onClick={() => onSuccess && onSuccess()}
      role="button"
      aria-label="CAPTCHA verification"
    >
      Turnstile Mock
    </div>
  )
}));

// Mock radix-ui Form
vi.mock('radix-ui', () => ({
  Form: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    Root: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    Submit: ({ children }: any) => <>{children}</>
  }
}));

// Mock components
vi.mock('@/components/input', () => ({
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  Input: ({ label, ...props }: any) => (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <input id={props.name} {...props} />
    </div>
  )
}));

vi.mock('@/components/textarea', () => ({
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  Textarea: ({ label, ...props }: any) => (
    <div>
      <label htmlFor={props.name}>{label}</label>
      <textarea id={props.name} {...props} />
    </div>
  )
}));

vi.mock('@/components/spinner', () => ({
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  Spinner: ({ ...props }: any) => <span {...props}>Loading...</span>
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the contact form', () => {
      render(<ContactForm />);

      expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument();
    });

    it('should render name input field', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('should render email input field', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('should render message textarea field', () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should render Turnstile CAPTCHA', () => {
      render(<ContactForm />);

      expect(screen.getByTestId('turnstile-mock')).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<ContactForm />);

      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('should have submit button disabled initially', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form fields with initial values', () => {
    it('should populate name field from searchParams', () => {
      const searchParams = {
        name: 'John Doe',
        email: '',
        message: ''
      };

      render(<ContactForm searchParams={searchParams} />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      expect(nameInput.value).toBe('John Doe');
    });

    it('should populate email field from searchParams', () => {
      const searchParams = {
        name: '',
        email: 'john@example.com',
        message: ''
      };

      render(<ContactForm searchParams={searchParams} />);

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      expect(emailInput.value).toBe('john@example.com');
    });

    it('should populate message field from searchParams', () => {
      const searchParams = {
        name: '',
        email: '',
        message: 'Hello, this is a test message'
      };

      render(<ContactForm searchParams={searchParams} />);

      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;
      expect(messageInput.value).toBe('Hello, this is a test message');
    });

    it('should populate all fields from searchParams', () => {
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

  describe('CAPTCHA interaction', () => {
    it('should enable submit button after solving CAPTCHA', async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeDisabled();

      // Solve CAPTCHA
      const turnstile = screen.getByTestId('turnstile-mock');
      fireEvent.click(turnstile);

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });

  describe('Form submission', () => {
    beforeEach(async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true });
    });

    it('should show error if submitting without solving CAPTCHA', async () => {
      render(<ContactForm />);

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('alert').textContent).toContain('Please complete the CAPTCHA');
      });
    });

    it('should submit form successfully when CAPTCHA is solved', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true });

      render(<ContactForm />);

      // Fill form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

      // Solve CAPTCHA
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      // Submit form
      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /send message/i });
        expect(submitButton).not.toBeDisabled();
      });

      const form = screen.getByRole('form');
      fireEvent.submit(form);

      await waitFor(() => {
        expect(sendContactEmail).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        });
      });
    });

    it('should show success message after successful submission', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true });

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByRole('status').textContent).toContain(
          'Your message has been sent successfully'
        );
      });
    });

    it('should show error message on submission failure', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ error: 'Failed to send email' });

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('alert').textContent).toContain('Failed to send email');
      });
    });

    it('should show error message on unexpected error', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockRejectedValue(new Error('Network error'));

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('alert').textContent).toContain('An unexpected error occurred');
      });
    });
  });

  describe('Loading state', () => {
    it('should show loading text during submission', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      let resolveSubmit: any;
      vi.mocked(sendContactEmail).mockReturnValue(
        new Promise(resolve => {
          resolveSubmit = resolve;
        })
      );

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();
      });

      // Resolve the submission
      resolveSubmit({ success: true });
    });

    it('should disable submit button during submission', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      let resolveSubmit: any;
      vi.mocked(sendContactEmail).mockReturnValue(
        new Promise(resolve => {
          resolveSubmit = resolve;
        })
      );

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /sending/i });
        expect(button).toBeDisabled();
      });

      // Resolve the submission
      resolveSubmit({ success: true });
    });
  });

  describe('Form dirty state', () => {
    it('should call useOnLeavePageConfirmation hook with false initially', () => {
      render(<ContactForm />);

      expect(useOnLeavePageConfirmation).toHaveBeenCalledWith(false);
    });

    it('should call useOnLeavePageConfirmation hook with true after form change', async () => {
      render(<ContactForm />);

      // Change a form field
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });

      await waitFor(() => {
        expect(useOnLeavePageConfirmation).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Accessibility', () => {
    it('should have accessible form label', () => {
      render(<ContactForm />);

      expect(screen.getByRole('form')).toHaveAttribute('aria-label', 'Contact form');
    });

    it('should have required indicator for name field', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).toBeRequired();
    });

    it('should have required indicator for email field', () => {
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeRequired();
    });

    it('should have required indicator for message field', () => {
      render(<ContactForm />);

      const messageInput = screen.getByLabelText(/message/i);
      expect(messageInput).toBeRequired();
    });

    it('should have aria-live for success message', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true });

      render(<ContactForm />);

      // Fill and submit form
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
      fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        const successMessage = screen.getByRole('status');
        expect(successMessage).toHaveAttribute('aria-live', 'polite');
      });
    });

    it('should have aria-live for error message', async () => {
      render(<ContactForm />);

      // Submit without CAPTCHA
      fireEvent.submit(screen.getByRole('form'));

      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
      });
    });
  });

  describe('Form reset', () => {
    it('should reset form after successful submission', async () => {
      const { sendContactEmail } = await import('@/app/actions/contact');
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true });

      render(<ContactForm />);

      // Fill form
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'Test message' } });

      // Solve CAPTCHA and submit
      fireEvent.click(screen.getByTestId('turnstile-mock'));

      await waitFor(() => {
        fireEvent.submit(screen.getByRole('form'));
      });

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });

      // Check that form is reset
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });
  });

  describe('Snapshot', () => {
    it('should match snapshot', () => {
      const { container } = render(<ContactForm />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with initial values', () => {
      const searchParams = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      };

      const { container } = render(<ContactForm searchParams={searchParams} />);
      expect(container).toMatchSnapshot();
    });
  });
});
