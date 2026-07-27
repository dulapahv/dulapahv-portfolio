"use client";

import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect } from "react";
import { ErrorDetails } from "@/components/error-details";
import { Footer } from "@/components/footer";
import { Link } from "@/components/link";
import { TopBar } from "@/components/top-bar/top-bar";
import { CONTACT_EMAIL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ErrorPage({
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
    <>
      <TopBar />
      <main className="space-y-4">
        <header>
          <h1 className="font-semibold text-3xl">Oops! Something Went Wrong</h1>
        </header>
        <p className="text-foreground-muted">
          An error occurred while rendering this page. Please try again later or
          contact me at{" "}
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
            "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 text-sm text-white",
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
    </>
  );
}
