"use client";

import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect } from "react";
import { Footer } from "@/components/footer";
import { TopBar } from "@/components/top-bar";
import { IS_DEV_ENV } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ErrorPage({
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
      <TopBar />
      <main className="space-y-4">
        <header>
          <h1 className="font-semibold text-3xl">Oops! Something Went Wrong</h1>
        </header>
        <p className="text-foreground-muted">
          An error occurred while rendering this page. Please try again later or{" "}
          <Link
            className={cn(
              "text-mirai-red underline underline-offset-2",
              "hover:decoration-2"
            )}
            href={`/contact?message=${encodeURIComponent(
              `Please describe what you were doing when this error occurred:



Please do not remove the details below, they help me identify and fix the issue faster.
====================
Error Details:
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
            "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 text-sm text-white",
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
    </>
  );
}
