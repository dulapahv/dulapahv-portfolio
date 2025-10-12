'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr';

import { IS_DEV_ENV } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <main className="space-y-4">
        <header>
          <h1 className="text-3xl font-semibold">Oops! Something Went Wrong</h1>
        </header>
        <p className="text-foreground-muted">
          An error occurred while rendering this page. Please try again later or{' '}
          <Link
            href={`/contact?message=${encodeURIComponent(
              `Please describe what you were doing when this error occurred:



Please do not remove the details below, they help me identify and fix the issue faster.
====================
Error Details:
Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})
Path: ${typeof window !== 'undefined' ? window.location.pathname : 'N/A'}
Name: ${error.name || 'N/A'}
Message: ${error.message || 'N/A'}
Cause: ${error.cause || 'N/A'}
Digest: ${error.digest || 'N/A'}
====================`,
            )}`}
            className={cn(
              'text-mirai-red underline underline-offset-2',
              'hover:decoration-2',
            )}
          >
            contact me
          </Link>{' '}
          if the issue persists.
        </p>
        <button
          onClick={reset}
          className={cn(
            `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2
            rounded-md px-3 py-2 text-sm font-medium text-white select-none`,
            'hover:bg-mirai-red/90 transition-colors hover:shadow-md',
            'active:scale-[0.98] active:!transition-transform',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
          )}
        >
          <ArrowsClockwiseIcon
            className="size-4.5 flex-shrink-0"
            aria-hidden="true"
          />
          <span>Try Again</span>
        </button>
      </main>
      <div className="text-foreground-muted mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="mb-2 font-semibold">Details:</p>
        <code className="block text-sm break-all whitespace-pre-wrap sm:text-base">
          {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
          <br />
          {`Path: ${typeof window !== 'undefined' ? window.location.pathname : 'N/A'}`}
          <br />
          {`Name: ${error.name || 'N/A'}`}
          <br />
          {`Message: ${error.message || 'N/A'}`}
          <br />
          {`Cause: ${error.cause || 'N/A'}`}
          <br />
          {`Digest: ${error.digest || 'N/A'}`}
          {IS_DEV_ENV && (
            <>
              <br />
              Stack Trace:
              <pre className="bg-background-elevated overflow-x-auto rounded p-2 text-xs">
                {error.stack}
              </pre>
            </>
          )}
        </code>
      </div>
      <Footer />
    </>
  );
}
