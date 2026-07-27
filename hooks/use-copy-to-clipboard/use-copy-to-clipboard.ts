import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_RESET_DELAY_MS = 800;

interface UseCopyToClipboardOptions {
  /** How long the `copied` flag stays true after a successful copy. */
  resetDelay?: number;
}

interface UseCopyToClipboardResult {
  copied: boolean;
  /** Copies the given text. Returns true on success. */
  copy: (text: string) => Promise<boolean>;
}

/**
 * Copies text to the clipboard with auto-resetting `copied` state. Uses the
 * Clipboard API and falls back to `document.execCommand("copy")` for browsers
 * without it.
 */
export function useCopyToClipboard({
  resetDelay = DEFAULT_RESET_DELAY_MS,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const flagCopied = useCallback(() => {
    setCopied(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
  }, [resetDelay]);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        flagCopied();
        return true;
      } catch (err) {
        console.error("Failed to copy text: ", err);

        // Legacy fallback for browsers without the Clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
          flagCopied();
          return true;
        } catch (fallbackErr) {
          console.error("Fallback copy failed: ", fallbackErr);
          return false;
        } finally {
          document.body.removeChild(textArea);
        }
      }
    },
    [flagCopied]
  );

  return { copied, copy };
}
