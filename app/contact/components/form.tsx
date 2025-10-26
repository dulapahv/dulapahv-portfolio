'use client';

import { useRef, useState, type FormEventHandler } from 'react';

import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr';
import { Form } from 'radix-ui';

import {
  EMAIL_MAX_LENGTH,
  EMAIL_REGEX,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  TURNSTILE_SITE_KEY,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useOnLeavePageConfirmation } from '@/hooks/use-on-leave-page-confirmation';
import type { RecipientEmailTemplateProps } from '@/components/email';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Textarea } from '@/components/textarea';
import { sendContactEmail } from '@/app/actions/contact';

interface ContactFormProps {
  searchParams?: RecipientEmailTemplateProps;
}

export const ContactForm = ({ searchParams }: ContactFormProps) => {
  const initialName = searchParams?.name || '';
  const initialEmail = searchParams?.email || '';
  const initialMessage = searchParams?.message || '';

  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isTurnstileSolved, setIsTurnstileSolved] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!isTurnstileSolved || isPending) {
      setSubmitError('Please complete the CAPTCHA to verify you are human.');
      return;
    }
    setSubmitError('');
    setSubmitSuccess(false);
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    try {
      setIsPending(true);
      const result = await sendContactEmail(data);
      if (result.error) {
        setSubmitError(result.error);
        return;
      }
      setSubmitSuccess(true);
      formRef.current?.reset();
    } catch (error) {
      setSubmitError(
        `An unexpected error occurred. Please try again.\n${error}`,
      );
    } finally {
      setIsPending(false);
      setIsTurnstileSolved(false);
      turnstileRef.current?.reset();
    }
  };

  useOnLeavePageConfirmation(isFormDirty);

  return (
    <Form.Root
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={() => setIsFormDirty(true)}
      className="grid w-full gap-6"
      role="form"
      aria-label="Contact form"
    >
      <Input
        label="Name"
        name="name"
        autoComplete="name"
        placeholder="Dulapah Vibulsanti"
        required
        maxLength={NAME_MAX_LENGTH}
        defaultValue={initialName}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="dulapah@example.com"
        pattern={EMAIL_REGEX.source}
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
          className="text-success text-sm font-semibold"
          role="status"
          aria-live="polite"
        >
          Your message has been sent successfully! You will receive a
          confirmation email and hear back from me soon.
        </div>
      )}
      {submitError && (
        <div
          className="text-error text-sm font-semibold whitespace-pre-line"
          role="alert"
          aria-live="assertive"
        >
          {submitError}
        </div>
      )}

      <div className="grid gap-1">
        <span
          id="turnstile-label"
          className="text-foreground-muted inline-block text-sm font-medium"
        >
          Let me know you&apos;re human
          <span className="after:text-error after:ml-0.5 after:content-['*']">
            <span className="sr-only"> (required)</span>
          </span>
        </span>
        <div role="group" aria-labelledby="turnstile-label">
          <Turnstile
            ref={turnstileRef}
            id="turnstile-widget"
            siteKey={TURNSTILE_SITE_KEY}
            onSuccess={() => setIsTurnstileSolved(true)}
            onExpire={() => {
              setIsTurnstileSolved(false);
              turnstileRef.current?.reset();
            }}
          />
        </div>
      </div>

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={!isTurnstileSolved || isPending}
          aria-disabled={!isTurnstileSolved || isPending}
          aria-describedby={
            submitError
              ? 'submit-error'
              : submitSuccess
                ? 'submit-success'
                : undefined
          }
          className={cn(
            `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2
            rounded-md px-3 py-2 text-sm font-medium text-white transition-transform
            select-none`,
            'hover:bg-mirai-red/90 hover:shadow-lg',
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
