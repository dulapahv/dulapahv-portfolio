"use client";

import { IS_DEV_ENV } from "@/lib/constants";

interface ErrorDetailsProps {
  error: Error & { digest?: string };
}

export function ErrorDetails({ error }: ErrorDetailsProps) {
  return (
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
        {IS_DEV_ENV ? (
          <>
            <br />
            Stack Trace:
            <pre className="overflow-x-auto rounded bg-background-elevated p-2 text-xs">
              {error.stack}
            </pre>
          </>
        ) : null}
      </code>
    </div>
  );
}
