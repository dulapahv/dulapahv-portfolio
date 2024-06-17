"use client";

import { useEffect } from "react";
import Error from "next/error";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button, Link as NextUILink } from "@nextui-org/react";
import * as Sentry from "@sentry/nextjs";

import { Providers } from "./providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-dvh text-default-800"
    >
      <body
        className={`mx-auto my-4 mt-16 max-w-5xl text-pretty px-4 antialiased sm:px-16 lg:mt-32 ${poppins.className}`}
      >
        <div className="fixed -right-[35%] -top-[25%] -z-50 size-full select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-[45deg] dark:mix-blend-lighten sm:rotate-[20deg]">
          <Image src="/pink.png" alt="pink" fill priority draggable={false} />
        </div>
        <div className="fixed -bottom-[15%] -left-[25%] -z-50 size-[80%] select-none overflow-clip opacity-90 mix-blend-darken dark:opacity-60 dark:mix-blend-lighten sm:rotate-[15deg]">
          <Image src="/blue.png" alt="blue" fill priority draggable={false} />
        </div>
        <Providers className="mb-32">
          <div className="space-y-8">
            <header>
              <h1 className="text-3xl font-semibold">An Error Occurred</h1>
            </header>
            <main className="space-y-4">
              <p className="text-default-600">
                An error occurred while rendering this page and the developer
                has been notified. Please try again later or{" "}
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
              <code className="whitespace-pre-line text-sm sm:text-base">
                Status: 500
                <br />
                {`Timestamp: ${new Date().toLocaleString()} (${new Date().toISOString()})`}
                <br />
                {`Digest: ${error.digest}`}
              </code>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

Error.getInitialProps = async (contextData: any): Promise<any> => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};
