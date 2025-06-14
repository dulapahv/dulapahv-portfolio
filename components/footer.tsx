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
            className={cn('text-mirai-red', 'hover:underline')}
          >
            source code
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
