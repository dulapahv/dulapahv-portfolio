import Link from 'next/link';

import { GITHUB_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16">
      <div className="text-foreground-muted flex flex-col gap-y-1 text-sm font-medium">
        <p>© {currentYear} Dulapah Vibulsanti. All rights reserved.</p>
        <p>
          View the{' '}
          <Link
            href={`${GITHUB_URL}/dulapahv-portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-mirai-red underline underline-offset-2',
              'hover:decoration-2',
            )}
          >
            source code
          </Link>
          .
        </p>
        <p>
          NLWeb Chat:{' '}
          <Link
            href="https://chat.dulapahv.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-mirai-red underline underline-offset-2',
              'hover:decoration-2',
            )}
          >
            chat.dulapahv.dev
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
