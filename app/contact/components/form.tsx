'use client';

import { useRef, useState, useTransition, type FormEventHandler } from 'react';

import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { Send } from 'lucide-react';
import { Form } from 'radix-ui';

import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Captcha } from '@/components/captcha';
import type { RecipientEmailTemplateProps } from '@/components/email';
import { Input } from '@/components/input';
import { Spinner } from '@/components/spinner';
import { Textarea } from '@/components/textarea';
import { sendContactEmail } from '@/app/actions/contact';

export const emailRegex = /^\S+@\S+\.\S+$/;

interface ContactFormProps {
  searchParams?: Omit<RecipientEmailTemplateProps, 'captcha'>;
}

export const ContactForm = ({ searchParams }: ContactFormProps) => {
  const initialName = searchParams?.name || '';
  const initialEmail = searchParams?.email || '';
  const initialMessage = searchParams?.message || '';

  const [isPending, startTransition] = useTransition();
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const captchaRef = useRef<TurnstileInstance | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const captchaInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isPending) return;

    // Clear previous messages
    setSubmitError('');
    setSubmitSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data: RecipientEmailTemplateProps = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      captcha: captchaToken,
    };

    startTransition(async () => {
      try {
        const result = await sendContactEmail(data);

        if (result.error) {
          setSubmitError(result.error);
          // Reset captcha on error
          captchaRef.current?.reset();
          setCaptchaToken('');
          if (captchaInputRef.current) {
            captchaInputRef.current.value = '';
          }
          return;
        }

        setSubmitSuccess(true);

        // Reset form and captcha
        formRef.current?.reset();
        captchaRef.current?.reset();
        setCaptchaToken('');
        if (captchaInputRef.current) {
          captchaInputRef.current.value = '';
        }
      } catch (error) {
        setSubmitError(
          `An unexpected error occurred. Please try again.\n${error}`,
        );
        captchaRef.current?.reset();
        setCaptchaToken('');
        if (captchaInputRef.current) {
          captchaInputRef.current.value = '';
        }
      }
    });
  };

  const onVerifyCaptcha = (token: string) => {
    setCaptchaToken(token);
    // Set the hidden input value to satisfy browser validation
    if (captchaInputRef.current) {
      captchaInputRef.current.value = token;
    }
  };

  return (
    <Form.Root
      ref={formRef}
      onSubmit={handleSubmit}
      className="grid w-full gap-6"
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

      <Form.Field name="captcha" className="grid gap-1">
        <Form.Label className="text-foreground-muted inline-block text-sm font-medium select-none">
          <span className="after:text-error after:ml-0.5 after:content-['*']">
            Verification
          </span>
        </Form.Label>
        <Captcha captchaRef={captchaRef} onVerifyCaptcha={onVerifyCaptcha} />
        {/* Hidden input for browser validation */}
        <Form.Control asChild>
          <input ref={captchaInputRef} type="hidden" name="captcha" required />
        </Form.Control>
        <Form.Message className="text-error text-sm" match="valueMissing">
          Please complete the captcha verification
        </Form.Message>
      </Form.Field>

      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="text-success text-sm font-medium">
          Your message has been sent successfully! You will receive a
          confirmation email and hear back from me soon.
        </div>
      )}
      {submitError && (
        <div className="text-error text-sm font-medium">{submitError}</div>
      )}

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2
            rounded-md px-3 py-2 text-sm font-medium text-white select-none`,
            'hover:bg-mirai-red/90 hover:shadow-md',
            'transition-transform active:scale-[0.98]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
            'border-mirai-red hover:border-mirai-red/90 border',
          )}
        >
          <>
            {isPending ? (
              <Spinner className="relative" />
            ) : (
              <Send className="size-4" />
            )}
            Send Message
          </>
        </button>
      </Form.Submit>
    </Form.Root>
  );
};
