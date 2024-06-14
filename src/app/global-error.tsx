"use client";

import { useEffect } from "react";
import Error from "next/error";
import { Button } from "@nextui-org/react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-semibold">An Error Occurred</h1>
          </header>
          <main className="space-y-4">
            <p className="text-default-600">
              An error occurred while rendering this page and the developer has
              been notified. Please try again later or contact me with the
              details below if you have any questions.
            </p>
            <Button onPress={() => reset()} color="primary" radius="sm">
              Try Again
            </Button>
          </main>
          <footer className="border-t-1 border-default-300 pt-6 text-default-500 dark:border-default-100">
            <p>Details:</p>
            <code className="text-sm sm:text-base">
              Status: 500 Internal Server Error
              <br />
              {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
              <br />
              {`Digest: ${error.digest}`}
            </code>
          </footer>
        </div>
      </body>
    </html>
  );
}
