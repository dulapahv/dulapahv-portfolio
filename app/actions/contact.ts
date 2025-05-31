'use server';

import { Resend } from 'resend';

import { CAPTCHA_URL, NAME } from '@/lib/constants';
import { EmailTemplate } from '@/components/email';
import type { EmailTemplateProps } from '@/components/email/types';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  captcha: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Verify captcha first
    const formData = new FormData();
    formData.append('cf-turnstile-response', data.captcha);

    const captchaResponse = await fetch(CAPTCHA_URL, {
      method: 'POST',
      body: formData,
    });

    if (!captchaResponse.ok) {
      return {
        error: `Captcha verification failed. Status: ${captchaResponse.status}`,
      };
    }

    const captchaResult = await captchaResponse.json();

    if (!captchaResult.success) {
      return {
        error: `Captcha verification failed. Error codes: ${captchaResult['error-codes']?.join(', ')}`,
      };
    }

    // Send email
    const { error } = await resend.emails.send({
      from: `${NAME} <${process.env.EMAIL}>`,
      to: [process.env.EMAIL as string],
      subject: `✨ New Contact Form Message - ${data.name}`,
      react: EmailTemplate({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      } as EmailTemplateProps),
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        error: 'Failed to send email. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
