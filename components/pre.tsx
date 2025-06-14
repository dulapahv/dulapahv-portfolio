'use client';

import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  };

  return (
    <>
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        aria-label="Copy code"
        title="Copy code"
        className={cn(
          `text-foreground-muted absolute top-[5px] right-2 cursor-pointer rounded-md p-2
          !transition-all`,
          'hover:text-foreground/80',
          'active:scale-90',
        )}
      >
        {isCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </>
  );
}
