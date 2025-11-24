'use client';

import { useEffect } from 'react';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';

import { IS_DEV_ENV } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: 'variable'
});

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html
      lang="en"
      className={cn('bg-background dark', raleway.className, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="text-foreground min-h-dvh leading-[1.6] text-pretty antialiased">
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          scriptProps={{ 'data-cfasync': 'false' }}
        >
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -top-[70%] -right-[60%] -z-50 size-[180%] overflow-clip opacity-50
              mix-blend-darken hue-rotate-45 select-none sm:-top-[45%] sm:size-[150%] dark:mix-blend-lighten"
          >
            <Image src="/pinku.png" alt="" fill priority className="object-contain" />
          </div>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -bottom-[50%] -left-[40%] -z-50 size-[140%] overflow-clip opacity-90
              mix-blend-darken select-none sm:-bottom-[30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
          >
            <Image src="/ao.png" alt="" fill priority className="object-contain" />
          </div>
          <div id="main-content" className="mx-auto max-w-4xl space-y-4 px-4 py-16">
            <main className="space-y-4">
              <header>
                <h1 className="text-3xl font-semibold">Critical Error</h1>
              </header>
              <p className="text-foreground-muted">
                A critical error occurred and the application could not recover. Please try again or{' '}
                <Link
                  href={`/contact?message=${encodeURIComponent(
                    `Please describe what you were doing when this error occurred:



Please do not remove the details below, they help me identify and fix the issue faster.
====================
Critical Error Details:
Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})
Path: ${typeof window !== 'undefined' ? window.location.pathname : 'N/A'}
Name: ${error.name || 'N/A'}
Message: ${error.message || 'N/A'}
Cause: ${error.cause || 'N/A'}
Digest: ${error.digest || 'N/A'}
====================`
                  )}`}
                  className={cn(
                    'text-mirai-red underline underline-offset-4',
                    'hover:text-mirai-red'
                  )}
                >
                  contact me
                </Link>{' '}
                if the issue persists.
              </p>
              <button
                onClick={reset}
                className={cn(
                  `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2
                  text-sm font-medium text-white select-none`,
                  'hover:bg-mirai-red/90 transition-colors hover:shadow-md',
                  'active:scale-[0.98] active:transition-transform!',
                  'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none'
                )}
              >
                <ArrowsClockwiseIcon className="size-4.5 shrink-0" aria-hidden="true" />
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
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
