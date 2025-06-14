'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { RefreshCw } from 'lucide-react';

import { cn } from '@/lib/utils';
import Breadcrumb from '@/components/breadcrumb';

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
      <Breadcrumb />
      <main className="space-y-4" id="main-content">
        <header>
          <h1 className="text-3xl font-semibold">An Error Occurred</h1>
        </header>
        <p className="text-foreground-muted">
          An error occurred while rendering this page. Please try again later or{' '}
          <Link
            href={`/contact?message=${encodeURIComponent(
              `Please describe what you were doing when this error occurred:


====================
Error Details:
Status: 500
Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})
Digest: ${error.digest || 'N/A'}
====================`,
            )}`}
            className={cn(
              'text-mirai-red underline underline-offset-4',
              'hover:text-mirai-red',
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
          <RefreshCw className="size-4 flex-shrink-0" aria-hidden="true" />
          <span>Try Again</span>
        </button>
      </main>
      <footer className="text-foreground-muted mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="mb-2 font-semibold">Details:</p>
        <code className="block text-sm break-all whitespace-pre-wrap sm:text-base">
          Status: 500
          <br />
          {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
          <br />
          {`Digest: ${error.digest || 'N/A'}`}
          {process.env.NODE_ENV === 'development' && (
            <>
              <br />
              <br />
              <span className="text-error">Error: {error.name}</span>
              <br />
              <span className="text-error">Message: {error.message}</span>
              {error.stack && (
                <>
                  <br />
                  <br />
                  <details className="mt-2">
                    <summary
                      className={cn(
                        'text-foreground cursor-pointer transition-colors',
                        'hover:text-foreground-muted',
                      )}
                    >
                      Stack Trace
                    </summary>
                    <pre className="bg-background-elevated mt-2 overflow-x-auto rounded p-2 text-xs">
                      {error.stack}
                    </pre>
                  </details>
                </>
              )}
            </>
          )}
        </code>
      </footer>
    </>
  );
}
