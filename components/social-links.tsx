import Image from 'next/image';
import Link from 'next/link';

import { ReadCvLogoIcon } from '@phosphor-icons/react/dist/ssr';

import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function SocialLinks() {
  return (
    <div className="flex gap-2">
      <Link
        href="https://dulapahv.dev/resume"
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
        className={cn(
          `border-border bg-background group flex items-center gap-x-1.5 rounded-lg border px-2 py-1
          font-medium !transition-all`,
          'hover:bg-background-light hover:scale-[1.02] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-md'
        )}
      >
        <div
          className={cn(
            `from-mirai-yellow to-mirai-yellow/60 rounded-md bg-gradient-to-br p-1 text-white shadow-md
            transition-transform`
          )}
        >
          <ReadCvLogoIcon className="size-4 shrink-0 scale-110 transition-transform group-hover:scale-[1.2] group-hover:rotate-[-15deg]" />
        </div>
        <span className="text-foreground text-sm">Résumé</span>
      </Link>

      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `border-border bg-background flex items-center gap-x-1.5 rounded-lg border px-2 py-1 font-medium
          !transition-all`,
          'hover:bg-background-light hover:scale-[1.02] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-md'
        )}
      >
        <div
          className={cn(
            `flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-400 p-1
            text-white shadow-md transition-transform`
          )}
        >
          <Image src="/linkedin.svg" alt="" width={16} height={16} />
        </div>
        <span className="text-foreground text-sm">LinkedIn</span>
      </Link>

      <Link
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `border-border bg-background flex items-center gap-x-1.5 rounded-lg border px-2 py-1 font-medium
          !transition-all`,
          'hover:bg-background-light hover:scale-[1.02] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-md'
        )}
      >
        <div
          className={cn(
            `flex items-center justify-center rounded-md bg-gradient-to-br from-gray-600 to-gray-400 p-1
            text-white shadow-md transition-transform`
          )}
        >
          <Image src="/octocat-white.svg" alt="" width={16} height={16} />
        </div>
        <span className="text-foreground text-sm">GitHub</span>
      </Link>
    </div>
  );
}
