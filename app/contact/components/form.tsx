'use client';

import { useRef, useState, useTransition, type FormEventHandler } from 'react';

import { PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr';
import { Form } from 'radix-ui';

import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { RecipientEmailTemplateProps } from '@/components/email';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Textarea } from '@/components/textarea';
import { sendContactEmail } from '@/app/actions/contact';

export const emailRegex = /^\S+@\S+\.\S+$/;

interface ContactFormProps {
  searchParams?: RecipientEmailTemplateProps;
}

export const ContactForm = ({ searchParams }: ContactFormProps) => {
  const initialName = searchParams?.name || '';
  const initialEmail = searchParams?.email || '';
  const initialMessage = searchParams?.message || '';

  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isPending) return;

    // Clear previous messages
    setSubmitError('');
    setSubmitSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    startTransition(async () => {
      try {
        const result = await sendContactEmail(data);

        if (result.error) {
          setSubmitError(result.error);
          return;
        }

        setSubmitSuccess(true);

        // Reset form
        formRef.current?.reset();
      } catch (error) {
        setSubmitError(
          `An unexpected error occurred. Please try again.\n${error}`,
        );
      }
    });
  };

  return (
    <Form.Root
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid w-full gap-6"
      role="form"
      aria-label="Contact form"
    >
      <Input
        label="Name"
        name="name"
        placeholder="Dulapah Vibulsanti"
        required
        maxLength={NAME_MAX_LENGTH}
        defaultValue={initialName}
      />
      <Input
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="dulapah@example.com"
        pattern={emailRegex.source}
        required
        maxLength={EMAIL_MAX_LENGTH}
        defaultValue={initialEmail}
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Hi Dulapah, I wanted to reach out to you about..."
        required
        maxLength={MESSAGE_MAX_LENGTH}
        defaultValue={initialMessage}
      />

      {/* Success/Error Messages */}
      {submitSuccess && (
        <div
          className="text-success text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          Your message has been sent successfully! You will receive a
          confirmation email and hear back from me soon.
        </div>
      )}
      {submitError && (
        <div
          className="text-error text-sm font-medium"
          role="alert"
          aria-live="assertive"
        >
          {submitError}
        </div>
      )}

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          aria-describedby={
            submitError
              ? 'submit-error'
              : submitSuccess
                ? 'submit-success'
                : undefined
          }
          className={cn(
            `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2
            rounded-md px-3 py-2 text-sm font-medium text-white !transition-all select-none`,
            'hover:bg-mirai-red/90 transition-colors hover:shadow-lg',
            'active:scale-[0.98] active:shadow-md',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
          )}
        >
          <>
            {isPending ? (
              <Spinner className="relative" />
            ) : (
              <PaperPlaneTiltIcon className="size-4.5" aria-hidden="true" />
            )}
            <span>{isPending ? 'Sending...' : 'Send Message'}</span>
          </>
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
