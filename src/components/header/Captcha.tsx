import React, { useRef } from 'react';

import { useTheme } from 'next-themes';

import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

interface CaptchaProps {
  onCaptchaSuccess: (token: string) => void;
}

const Captcha = ({ onCaptchaSuccess }: CaptchaProps) => {
  const captchaInstance = useRef<TurnstileInstance>(null);

  const { resolvedTheme } = useTheme();

  return (
    <Turnstile
      siteKey="0x4AAAAAAACYFWWcTzhCNWz4" // 0x4AAAAAAACYFWWcTzhCNWz4 1x00000000000000000000AA
      onError={() => {
        // TODO: Reset captcha
        console.log('Error!');
      }}
      onExpire={() => {
        console.log('Expired!');
        // TODO: Reset captcha
        // captchaInstance.current?.reset();
      }}
      onSuccess={onCaptchaSuccess}
      options={{
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      }}
      ref={captchaInstance}
      className="absolute bottom-2.5"
    />
  );
};

export default Captcha;
