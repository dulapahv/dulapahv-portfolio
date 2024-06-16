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
        setIsTokenVerified(true);
      } else {
        console.error(...result["error-codes"]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTokenVerifying(false);
    }
  };

  const handleCaptchaError = () => {
    isSuccess(false);
    setIsCaptchaError(true);
    setIsCaptchaSolved(false);
    setIsTokenVerifying(false);
  };

  const handleCaptchaExpire = () => {
    isSuccess(false);
    setIsCaptchaSolved(false);
    setIsTokenVerifying(false);
  };

  const handleCaptchaLoad = () => {
    isSuccess(false);
    setIsCaptchaSolved(false);
    setIsTokenVerifying(false);
    setIsCaptchaLoading(false);
  };

  const retryCaptcha = () => {
    turnstileRef.current?.reset();
    setIsCaptchaError(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

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
        onExpire={handleCaptchaExpire}
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
      ) : isCaptchaError ? (
        <>
          <p className="text-xs text-danger">
            Captcha verification failed. Please try again.
          </p>
          <Button
            onPress={retryCaptcha}
            size="sm"
            className="w-fit bg-default-100"
          >
            Try Again
          </Button>
        </>
      ) : isCaptchaSolved ? (
        isTokenVerifying ? (
          renderLoadingSpinner("Verifying token...")
        ) : isTokenVerified ? (
          <p className="text-xs text-success">Captcha verified successfully.</p>
        ) : (
          <>
            <p className="text-xs text-danger">
              Token is invalid. Please reload this page and try again. See the
              console for more details.
            </p>
            <Button
              onPress={reloadPage}
              size="sm"
              className="w-fit bg-default-100"
            >
              Reload Page
            </Button>
          </>
        )
      ) : (
        renderLoadingSpinner("Waiting for Captcha verification...")
      )}
    </div>
  );
};

export default Captcha;
