"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Link as NextUILink } from "@nextui-org/react";
import * as Sentry from "@sentry/nextjs";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">An Error Occurred</h1>
      </header>
      <main className="space-y-4">
        <p className="text-default-600">
          An error occurred while rendering this page and the developer has been
          notified. Please try again later or{" "}
          <NextUILink
            href={`/contact?message=${encodeURIComponent(
              `Details:\nStatus: 500\nTimestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})\nDigest: ${error.digest}`,
            )}`}
            as={Link}
            underline="hover"
            isExternal
            showAnchorIcon
          >
            contact me
          </NextUILink>{" "}
          if you have any questions.
        </p>
        <Button onPress={() => reset()} color="primary" radius="sm">
          Try Again
        </Button>
      </main>
      <footer className="border-t-1 border-default-300 pt-6 text-default-500 dark:border-default-100">
        <p>Details:</p>
        <code className="text-sm sm:text-base">
          Status: 500
          <br />
          {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
          <br />
          {`Digest: ${error.digest}`}
          <br />
          {process.env.NEXT_PUBLIC_ENV === "development"
            ? `Reason: ${error.name} - ${error.message}`
            : null}
          <br />
          {process.env.NEXT_PUBLIC_ENV === "development"
            ? `Stack: ${error.stack}`
            : null}
        </code>
      </footer>
    </div>
  );
};

export default Error;

Error.getInitialProps = async (contextData: any): Promise<any> => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};
