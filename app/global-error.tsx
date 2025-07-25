'use client';

import { useEffect } from 'react';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { GeistMono } from 'geist/font/mono';
import { RefreshCw } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/lib/utils';
import Footer from '@/components/footer';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: 'variable',
});

export default function GlobalError({
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
    <html
      lang="en"
      className={`${raleway.className} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground leading-[1.6] text-pretty antialiased">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {/* Background decorative images */}
          <div
            aria-hidden="true"
            role="presentation"
            className="pointer-events-none fixed -top-[25%] -right-[35%] -z-50 size-full overflow-clip
              opacity-50 mix-blend-darken hue-rotate-[45deg] select-none sm:rotate-[20deg]
              dark:mix-blend-lighten"
          >
            <Image src="/pinku.png" alt="" fill priority />
          </div>
          <div
            aria-hidden="true"
            role="presentation"
            className="pointer-events-none fixed -bottom-[15%] -left-[25%] -z-50 size-[80%]
              overflow-clip opacity-90 mix-blend-darken select-none sm:rotate-[15deg]
              dark:opacity-60 dark:mix-blend-lighten"
          >
            <Image src="/ao.png" alt="" fill priority />
          </div>

          <div
            id="main-content"
            className="mx-auto max-w-4xl space-y-4 px-4 py-16"
          >
            <main className="space-y-4">
              <header>
                <h1 className="text-3xl font-semibold">Application Error</h1>
              </header>
              <p className="text-foreground-muted">
                A critical error occurred and the application could not recover.
                Please try again or{' '}
                <Link
                  href={`/contact?message=${encodeURIComponent(
                    `Please describe what you were doing when this error occurred:


====================
Critical Error Details:
Status: 500 (Critical)
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
                <RefreshCw
                  className="size-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Try Again</span>
              </button>
            </main>
            <footer className="text-foreground-muted mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="mb-2 font-semibold">Details:</p>
              <code className="block text-sm break-all whitespace-pre-wrap sm:text-base">
                Status: 500 (Critical)
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
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
