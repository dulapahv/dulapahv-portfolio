'use client';

import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ArrowsOutSimpleIcon, CheckIcon, CopyIcon, XIcon } from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

export function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  return (
    <>
      <div className="absolute top-[5px] right-2 z-50 flex gap-1">
        <button
          onClick={handleToggleExpand}
          aria-label={isExpanded ? 'Collapse code' : 'Expand code'}
          title={isExpanded ? 'Collapse code' : 'Expand code'}
          className={cn(
            'text-foreground-muted cursor-pointer rounded-md p-2 transition-all',
            'hover:text-foreground/80',
            'active:scale-90'
          )}
        >
          <ArrowsOutSimpleIcon className="size-4.5" />
        </button>
        <button
          disabled={isCopied}
          onClick={handleClickCopy}
          aria-label="Copy code"
          title="Copy code"
          className={cn(
            'text-foreground-muted cursor-pointer rounded-md p-2 transition-all',
            'hover:text-foreground/80',
            'active:scale-90',
            isCopied && 'cursor-default'
          )}
        >
          {isCopied ? <CheckIcon className="size-4.5" /> : <CopyIcon className="size-4.5" />}
        </button>
      </div>
      <pre ref={preRef} {...props}>
        {children}
      </pre>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-background/40 fixed inset-0 z-9999 flex items-center justify-center backdrop-blur-sm"
                onClick={handleToggleExpand}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="border-border bg-background relative mx-4 my-8 max-h-[90vh] w-full max-w-7xl min-w-[600px]
                    overflow-auto rounded-lg border py-2 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="absolute top-2 right-2 z-50 flex gap-1">
                    <button
                      onClick={handleClickCopy}
                      aria-label="Copy code"
                      title="Copy code"
                      className={cn(
                        'text-foreground-muted bg-background/80 cursor-pointer rounded-md p-2 backdrop-blur-sm transition-all',
                        'hover:text-foreground/80',
                        'active:scale-90'
                      )}
                    >
                      {isCopied ? (
                        <CheckIcon className="size-4.5" />
                      ) : (
                        <CopyIcon className="size-4.5" />
                      )}
                    </button>
                    <button
                      onClick={handleToggleExpand}
                      aria-label="Close expanded view"
                      title="Close (Esc)"
                      className={cn(
                        'text-foreground-muted bg-background/80 cursor-pointer rounded-md p-2 backdrop-blur-sm transition-all',
                        'hover:text-foreground/80',
                        'active:scale-90'
                      )}
                    >
                      <XIcon className="size-4.5" />
                    </button>
                  </div>
                  <pre className={props.className}>{children}</pre>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
