"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Button, Spinner } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { CAPTCHA_URL, CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/lib/constants";

interface CaptchaProps {
  isSuccess: Dispatch<SetStateAction<boolean>>;
}

const Captcha = ({ isSuccess }: CaptchaProps) => {
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [isCaptchaError, setIsCaptchaError] = useState(false);
  const [isTokenVerifying, setIsTokenVerifying] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const { resolvedTheme } = useTheme();

  const handleCaptchaSuccess = async (token: string) => {
    setIsCaptchaSolved(true);
    setIsTokenVerifying(true);

    try {
      const response = await fetch(`${CAPTCHA_URL}?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        isSuccess(true);
        setIsTokenVerifying(false);
        setIsTokenVerified(true);
      } else {
        console.error(...result["error-codes"]);
      }
    } catch (error) {
      console.error(error);
    }
    setIsTokenVerifying(false);
  };

  return (
    <div className="select-none space-y-2">
      {isCaptchaLoading ? (
        <div className="flex gap-x-2">
          <Spinner
            size="sm"
            classNames={{
              circle1: "border-b-default-500",
              circle2: "border-b-default-500",
            }}
          />
          <p className="text-sm text-default-500">Loading Captcha...</p>
        </div>
      ) : null}
      <Turnstile
        siteKey={CLOUDFLARE_TURNSTILE_SITE_KEY}
        onSuccess={handleCaptchaSuccess}
        onError={() => setIsCaptchaError(true)}
        onExpire={() => {
          isSuccess(false);
          setIsCaptchaSolved(false);
          setIsTokenVerifying(false);
        }}
        onWidgetLoad={() => setIsCaptchaLoading(false)}
        options={{
          theme: resolvedTheme === "dark" ? "dark" : "light",
          size: "auto",
        }}
      />
      {isCaptchaError ? (
        <>
          <p className="text-sm text-danger">
            Captcha verification failed. Please try again.
          </p>
          <Button
            onPress={() => {
              turnstileRef.current?.reset();
              setIsCaptchaError(false);
            }}
            size="sm"
            className="w-fit bg-default-100"
          >
            Try Again
          </Button>
        </>
      ) : null}
      {isCaptchaSolved ? (
        isTokenVerifying ? (
          <>
            <div className="flex gap-x-2">
              <Spinner
                size="sm"
                classNames={{
                  circle1: "border-b-default-500",
                  circle2: "border-b-default-500",
                }}
              />
              <p className="text-sm text-default-500">Verifying token...</p>
            </div>
          </>
        ) : isTokenVerified ? (
          <p className="text-xs text-success">Captcha verified successfully.</p>
        ) : (
          <>
            <p className="text-xs text-danger">
              Token is invalid. Please reload this page and try again. See the
              console for more details.
            </p>
            <Button
              onPress={() => window.location.reload()}
              size="sm"
              className="w-fit bg-default-100"
            >
              Reload Page
            </Button>
          </>
        )
      ) : null}
    </div>
  );
};

export default Captcha;
