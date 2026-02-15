import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
});

export default function NotFound() {
  return (
    <>
      <main className="space-y-4">
        <header>
          <h1 className="font-semibold text-3xl">Page Not Found</h1>
        </header>
        <p>
          Sorry, the page you are looking for does not exist. Please check the
          URL and try again.
        </p>
        <Link
          className={cn(
            "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 font-medium text-sm text-white",
            "hover:!! hover:bg-mirai-red/90 hover:shadow-md",
            "active:scale-[0.98] active:transition-transform!",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          )}
          href="/"
        >
          <HouseIcon className="size-4.5 shrink-0" />
          Return Home
        </Link>
      </main>
      <footer className="mt-8 border-gray-200 border-t pt-6 text-foreground-muted dark:border-gray-800">
        <p className="mb-2 font-semibold">Details:</p>
        <code className="block whitespace-pre-wrap break-all text-sm sm:text-base">
          Status: 404
        </code>
      </footer>
      <Footer />
    </>
  );
}
