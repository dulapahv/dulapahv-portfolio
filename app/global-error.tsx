"use client";

import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { Archivo, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { BackgroundDecor } from "@/components/background-decor";
import { ErrorDetails } from "@/components/error-details";
import { Footer } from "@/components/footer";
import { Link } from "@/components/link";
import { TopBar } from "@/components/top-bar/top-bar";
import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-archivo",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-geist-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "variable",
});

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html
      className={cn(
        "dark bg-background",
        ibmPlexSans.className,
        archivo.variable,
        geistMono.variable
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
          <BackgroundDecor />
          <div
            className="mx-auto max-w-7xl space-y-4 px-4 py-16 pt-24"
            id="main-content"
          >
            <TopBar />
            <main className="space-y-4">
              <header>
                <h1 className="font-semibold text-3xl">Critical Error</h1>
              </header>
              <p className="text-foreground-muted">
                A critical error occurred and the application could not recover.
                Please try again or contact me at{" "}
                <Link
                  aria-label={`Email address: ${CONTACT_EMAIL}`}
                  className={cn("font-semibold text-mirai-red")}
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </Link>{" "}
                if the issue persists.
              </p>
              <button
                className={cn(
                  "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 font-medium text-sm text-white",
                  "hover:bg-mirai-red/90 hover:shadow-md",
                  "active:scale-[0.98] active:transition-transform!",
                  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                )}
                onClick={unstable_retry}
                type="button"
              >
                <ArrowsClockwiseIcon
                  aria-hidden="true"
                  className="size-4.5 shrink-0"
                />
                <span>Try Again</span>
              </button>
            </main>

            <ErrorDetails error={error} />

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
