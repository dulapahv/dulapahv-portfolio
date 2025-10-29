import type { Metadata } from 'next';
import Link from 'next/link';

import { HouseIcon } from '@phosphor-icons/react/dist/ssr';

import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';

export const metadata: Metadata = createMetadata({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.'
});

export default function NotFound() {
  return (
    <>
      <main className="space-y-4">
        <header>
          <h1 className="text-3xl font-semibold">Page Not Found</h1>
        </header>
        <p>
          Sorry, the page you are looking for does not exist. Please check the URL and try again.
        </p>
        <Link
          href="/"
          className={cn(
            `bg-mirai-red flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2
            text-sm font-medium text-white select-none`,
            'hover:bg-mirai-red/90 hover:!transition-colors! hover:shadow-md',
            'active:scale-[0.98] active:transition-transform!',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none'
          )}
        >
          <HouseIcon className="size-4.5 shrink-0" />
          Return Home
        </Link>
      </main>
      <footer className="text-foreground-muted mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="mb-2 font-semibold">Details:</p>
        <code className="block text-sm break-all whitespace-pre-wrap sm:text-base">
          Status: 404
        </code>
      </footer>
      <Footer />
    </>
  );
}
