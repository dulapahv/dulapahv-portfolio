'use client';

import { RefObject, useRef, useState } from 'react';

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { useTheme } from 'next-themes';

import { CF_TURNSTILE_SITE_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/spinner';

interface CaptchaProps {
  onVerifyCaptcha: (token: string) => void;
  captchaRef?: RefObject<TurnstileInstance | null>;
}

export const Captcha = ({ onVerifyCaptcha, captchaRef }: CaptchaProps) => {
  const { resolvedTheme } = useTheme();
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);
  const [isCaptchaError, setIsCaptchaError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleCaptchaLoad = () => {
    setIsCaptchaLoading(false);
    if (captchaRef) {
      captchaRef.current = turnstileRef.current;
    }
  };

  const handleCaptchaExpired = () => {
    setIsCaptchaError(true);
    setErrorMessage('Captcha expired. Please try again.');
    onVerifyCaptcha(''); // Clear the token in parent
  };

  const handleCaptchaError = () => {
    setIsCaptchaError(true);
    setErrorMessage('Captcha verification failed. Please try again.');
    onVerifyCaptcha(''); // Clear the token in parent
  };

  const handleCaptchaSuccess = (token: string) => {
    setIsCaptchaError(false);
    onVerifyCaptcha(token);
  };

  const resetCaptcha = () => {
    setIsCaptchaError(false);
    turnstileRef.current?.reset();
  };

  return (
    <div className="space-y-2 select-none">
      <Turnstile
        ref={turnstileRef}
        siteKey={CF_TURNSTILE_SITE_KEY}
        onSuccess={handleCaptchaSuccess}
        onError={handleCaptchaError}
        onExpire={handleCaptchaExpired}
        onWidgetLoad={handleCaptchaLoad}
        options={{
          theme: resolvedTheme === 'dark' ? 'dark' : 'light',
        }}
      />
      {isCaptchaLoading ? (
        <div
          className="border-border bg-background-subtle flex h-16 w-[300px] items-center
            border-[0.5px]"
        >
          <Spinner className="relative m-4" />
          <span className="text-foreground-muted text-xs">
            Loading Captcha...
          </span>
        </div>
      ) : (
        isCaptchaError && (
          <>
            <p className="text-error text-xs">{errorMessage}</p>
            <button
              onClick={resetCaptcha}
              type="button"
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium',
                'bg-background-subtle border-border text-foreground border',
                'hover:bg-background-muted transition-colors',
                'cursor-pointer',
              )}
            >
              Try Again
            </button>
          </>
        )
      )}
    </div>
  );
};
