'use server';

import { Resend } from 'resend';

import { CAPTCHA_URL, CF_TURNSTILE_SECRET_KEY, NAME } from '@/lib/constants';
import {
  ConfirmationEmailTemplate,
  RecipientEmailTemplate,
  type ConfirmationEmailTemplateProps,
  type RecipientEmailTemplateProps,
} from '@/components/email';

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
      headers: {
        'X-Server-Secret': CF_TURNSTILE_SECRET_KEY,
      },
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

    // Send email to site owner
    const { error: ownerError } = await resend.emails.send({
      from: `${NAME} <${process.env.EMAIL}>`,
      to: [process.env.EMAIL as string],
      subject: `✨ New Contact Form Message - ${data.name}`,
      react: RecipientEmailTemplate({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      } as RecipientEmailTemplateProps),
    });

    if (ownerError) {
      console.error('Resend error (to owner):', ownerError);
      return {
        error: 'Failed to send email to site owner. Please try again.',
      };
    }

    // Send confirmation email to user
    const { error: userError } = await resend.emails.send({
      from: `${NAME} <${process.env.EMAIL}>`,
      to: [data.email.trim()],
      subject: `✨ Confirmation of Your Message to ${NAME}`,
      react: ConfirmationEmailTemplate({
        name: data.name.trim(),
        message: data.message.trim(),
      } as ConfirmationEmailTemplateProps),
    });

    if (userError) {
      console.error('Resend error (to user):', userError);
      return {
        error: 'Failed to send confirmation email to user. Please try again.',
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
