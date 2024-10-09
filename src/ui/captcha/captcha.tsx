"use client";

import { MutableRefObject, useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Button, Spinner } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/lib/constants";

interface CaptchaProps {
  onVerifyCaptcha: (token: string) => void;
  turnstileRef?: MutableRefObject<TurnstileInstance | null>;
}

export function Captcha({ onVerifyCaptcha }: CaptchaProps) {
  const { resolvedTheme } = useTheme();

  const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);
  const [isCaptchaError, setIsCaptchaError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const turnstileRef = useRef<TurnstileInstance>(null);

  function handleCaptchaLoad() {
    setIsCaptchaLoading(false);
  }

  function handleCaptchaExpired() {
    setIsCaptchaError(true);
    setErrorMessage("Captcha expired. Please try again.");
  }

  function handleCaptchaError() {
    setIsCaptchaError(true);
    setErrorMessage("Captcha verification failed. Please try again.");
  }

  function handleCaptchaSuccess(token: string) {
    setIsCaptchaError(false);
    onVerifyCaptcha(token);
  }

  function resetCaptcha() {
    setIsCaptchaError(false);
    turnstileRef.current?.reset();
  }

  const renderLoadingSpinner = (text: string) => (
    <div className="flex gap-x-2">
      <Spinner
        size="sm"
        classNames={{
          wrapper: "!size-4",
          circle1: "border-b-warning",
          circle2: "border-b-warning",
        }}
      />
      <p className="text-xs text-warning">{text}</p>
    </div>
  );

  return (
    <div className="select-none space-y-2">
      <Turnstile
        siteKey={CLOUDFLARE_TURNSTILE_SITE_KEY}
        onSuccess={handleCaptchaSuccess}
        onError={handleCaptchaError}
        onExpire={handleCaptchaExpired}
        onWidgetLoad={handleCaptchaLoad}
        options={{
          theme: resolvedTheme === "dark" ? "dark" : "light",
          size: "auto",
        }}
      />
      {isCaptchaLoading ? (
        <div className="flex h-16 w-[300px] items-center border-[0.5px] border-[#e0e0e0] bg-neutral-50 dark:border-[#666666] dark:bg-[#222222]">
          <div className="m-4 flex gap-x-2">
            {renderLoadingSpinner("Loading Captcha...")}
          </div>
        </div>
      ) : (
        isCaptchaError && (
          <>
            <p className="text-xs text-danger">{errorMessage}</p>
            <Button
              onPress={resetCaptcha}
              size="sm"
              className="w-fit bg-default-100"
            >
              Try Again
            </Button>
          </>
        )
      )}
    </div>
  );
}
