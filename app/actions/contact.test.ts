import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendContactEmail } from './Contact';

// Create mock send function before any imports
const mockSend = vi.fn();

vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      emails: any;
      constructor() {
        // Use a getter to access mockSend
        this.emails = {
          get send() {
            return mockSend;
          }
        };
      }
    }
  };
});

vi.mock('@/components/email', () => ({
  ConfirmationEmailTemplate: vi.fn(),
  RecipientEmailTemplate: vi.fn()
}));

describe('sendContactEmail', () => {
  const mockFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Test message'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default success responses
    mockSend.mockResolvedValue({ error: null });
  });

  it('should successfully send emails to owner and user', async () => {
    const result = await sendContactEmail(mockFormData);

    expect(result).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it('should trim whitespace from form data', async () => {
    const dataWithSpaces = {
      name: '  John Doe  ',
      email: '  john@example.com  ',
      message: '  Test message  '
    };

    await sendContactEmail(dataWithSpaces);

    // Verify emails were sent
    expect(mockSend).toHaveBeenCalledTimes(2);

    // Check that email addresses were trimmed
    const calls = mockSend.mock.calls;
    expect(calls[1][0].to).toEqual(['john@example.com']); // User email should be trimmed
  });

  it('should return error when owner email fails', async () => {
    mockSend.mockResolvedValueOnce({
      error: { message: 'Failed to send' }
    });

    const result = await sendContactEmail(mockFormData);

    expect(result).toEqual({
      error: 'Failed to send email to site owner. Please try again.'
    });
    // Should only be called once (owner email failed, user email not attempted)
    expect(mockSend).toHaveBeenCalledTimes(1);
  });

  it('should return error with form data when user email fails', async () => {
    mockSend
      .mockResolvedValueOnce({ error: null }) // Owner email succeeds
      .mockResolvedValueOnce({ error: { message: 'Failed to send' } }); // User email fails

    const result = await sendContactEmail(mockFormData);

    expect(result.error).toContain('Your message has been sent successfully!');
    expect(result.error).toContain('Name: John Doe');
    expect(result.error).toContain('Email: john@example.com');
    expect(result.error).toContain('Message:\nTest message');
    expect(mockSend).toHaveBeenCalledTimes(2);
  });

  it('should handle unexpected errors', async () => {
    mockSend.mockRejectedValue(new Error('Network error'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await sendContactEmail(mockFormData);

    expect(result).toEqual({
      error: 'An unexpected error occurred. Please try again.'
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Contact form error:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('should log console error when owner email fails', async () => {
    const ownerError = { message: 'Owner email failed' };
    mockSend.mockResolvedValueOnce({ error: ownerError });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await sendContactEmail(mockFormData);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Resend error (to owner):', ownerError);

    consoleErrorSpy.mockRestore();
  });

  it('should log console error when user email fails', async () => {
    const userError = { message: 'User email failed' };
    mockSend.mockResolvedValueOnce({ error: null }).mockResolvedValueOnce({ error: userError });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await sendContactEmail(mockFormData);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Resend error (to user):', userError);

    consoleErrorSpy.mockRestore();
  });

  it('should send email to correct recipients', async () => {
    await sendContactEmail(mockFormData);

    const calls = mockSend.mock.calls;

    // First call should be to owner
    expect(calls[0][0].to).toContain(process.env.EMAIL);

    // Second call should be to user
    expect(calls[1][0].to).toEqual(['john@example.com']);
  });

  it('should use correct email subjects', async () => {
    await sendContactEmail(mockFormData);

    const calls = mockSend.mock.calls;

    expect(calls[0][0].subject).toContain('New Contact Form Message - John Doe');
    expect(calls[1][0].subject).toContain('Confirmation of Your Message');
  });
});
