'use server';

import { checkBotId } from 'botid/server';
import { Resend } from 'resend';

import { IS_DEV_ENV, NAME } from '@/lib/constants';
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
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const verification = await checkBotId({
      developmentOptions: {
        bypass: IS_DEV_ENV ? 'HUMAN' : undefined,
      },
    });

    if (!verification.isBot) {
      return {
        error: 'Bot verification failed. Please try again.',
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
        error: `Your message has been sent successfully!, but we failed to send a confirmation email to you.\nHere is the information you have submitted:\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\nMessage:\n${data.message.trim()}`,
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
