import { Suspense } from 'react';
import { Archivo } from 'next/font/google';
import Link from 'next/link';

import { GITHUB_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { CurrentYear } from './current-year';

const archivo = Archivo({ subsets: ['latin'], weight: 'variable' });

export function Footer() {
  return (
    <footer className={cn('mt-16', archivo.className)}>
      <div className="text-foreground-muted flex flex-col gap-y-1 text-sm">
        <p>
          ©{' '}
          <Suspense fallback="2024">
            <CurrentYear />
          </Suspense>{' '}
          Dulapah Vibulsanti. All rights reserved.
        </p>
        <p>
          View the{' '}
          <Link
            href={`${GITHUB_URL}/dulapahv-portfolio`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('text-mirai-red underline underline-offset-2', 'hover:decoration-2')}
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
            className={cn('text-mirai-red underline underline-offset-2', 'hover:decoration-2')}
          >
            chat.dulapahv.dev
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
