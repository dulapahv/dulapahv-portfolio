"use client";

import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { GeistMono } from "geist/font/mono";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { Footer } from "@/components/footer";
import { TopBar } from "@/components/top-bar/top-bar";
import { IS_DEV_ENV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: "variable",
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
      className={cn(
        "dark bg-background",
        raleway.className,
        GeistMono.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-dvh text-pretty text-foreground leading-[1.6] antialiased">
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          scriptProps={{ "data-cfasync": "false" }}
        >
          <div
            aria-hidden
            className="pointer-events-none fixed -top-[70%] -right-[60%] -z-50 size-[180%] select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-45 sm:-top-[45%] sm:size-[150%] dark:mix-blend-lighten"
            role="presentation"
          >
            <Image
              alt=""
              className="object-contain"
              fill
              priority
              src="/pinku.png"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none fixed -bottom-[50%] -left-[40%] -z-50 size-[140%] select-none overflow-clip opacity-90 mix-blend-darken sm:-bottom-[30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
            role="presentation"
          >
            <Image
              alt=""
              className="object-contain"
              fill
              priority
              src="/ao.png"
            />
          </div>
          <div
            className="mx-auto max-w-4xl space-y-4 px-4 py-16"
            id="main-content"
          >
            <TopBar />
            <main className="space-y-4">
              <header>
                <h1 className="font-semibold text-3xl">Critical Error</h1>
              </header>
              <p className="text-foreground-muted">
                A critical error occurred and the application could not recover.
                Please try again or{" "}
                <Link
                  className={cn(
                    "text-mirai-red underline underline-offset-4",
                    "hover:text-mirai-red"
                  )}
                  href={`/contact?message=${encodeURIComponent(
                    `Please describe what you were doing when this error occurred:



Please do not remove the details below, they help me identify and fix the issue faster.
====================
Critical Error Details:
Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})
Path: ${typeof window !== "undefined" ? window.location.pathname : "N/A"}
Name: ${error.name || "N/A"}
Message: ${error.message || "N/A"}
Cause: ${error.cause || "N/A"}
Digest: ${error.digest || "N/A"}
====================`
                  )}`}
                >
                  contact me
                </Link>{" "}
                if the issue persists.
              </p>
              <button
                className={cn(
                  "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 font-medium text-sm text-white",
                  "transition-colors hover:bg-mirai-red/90 hover:shadow-md",
                  "active:scale-[0.98] active:transition-transform!",
                  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                )}
                onClick={reset}
                type="button"
              >
                <ArrowsClockwiseIcon
                  aria-hidden="true"
                  className="size-4.5 shrink-0"
                />
                <span>Try Again</span>
              </button>
            </main>
            <div className="mt-8 border-gray-200 border-t pt-6 text-foreground-muted dark:border-gray-800">
              <p className="mb-2 font-semibold">Details:</p>
              <code className="block whitespace-pre-wrap break-all text-sm sm:text-base">
                {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
                <br />
                {`Path: ${typeof window !== "undefined" ? window.location.pathname : "N/A"}`}
                <br />
                {`Name: ${error.name || "N/A"}`}
                <br />
                {`Message: ${error.message || "N/A"}`}
                <br />
                {`Cause: ${error.cause || "N/A"}`}
                <br />
                {`Digest: ${error.digest || "N/A"}`}
                {IS_DEV_ENV && (
                  <>
                    <br />
                    Stack Trace:
                    <pre className="overflow-x-auto rounded bg-background-elevated p-2 text-xs">
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
