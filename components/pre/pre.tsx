"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export function Pre({
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
        aria-label="Copy code"
        className={cn(
          "absolute top-[5px] right-2 z-50 cursor-pointer rounded-md p-2 text-foreground-muted transition-all!",
          "hover:text-foreground/80",
          "active:scale-90"
        )}
        disabled={isCopied}
        onClick={handleClickCopy}
        title="Copy code"
        type="button"
      >
        {isCopied ? (
          <CheckIcon className="size-4.5" />
        ) : (
          <CopyIcon className="size-4.5" />
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </>
  );
}
