import Image from 'next/image';
import Link from 'next/link';

import { FileText } from 'lucide-react';

import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function SocialLinks() {
  return (
    <div className="flex gap-2">
      <Link
        href="https://dulapahv.dev/resume"
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false} // DNS will handle redirecting to the resume page
        className={cn(
          `border-border bg-background group flex items-center gap-x-1.5 rounded-lg border
          px-2 py-1 font-medium transition-transform`,
          'hover:bg-background-light hover:scale-[1.05] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-sm',
        )}
      >
        <div
          className={cn(
            `from-mirai-yellow to-mirai-yellow/60 rounded-md bg-gradient-to-br p-1 text-white
            shadow-md transition-transform`,
            'group-hover:scale-110',
          )}
        >
          <FileText className="size-4 flex-shrink-0" />
        </div>
        <span className="text-foreground text-sm">Résumé</span>
      </Link>

      <Link
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          `border-border bg-background group flex items-center gap-x-1.5 rounded-lg border
          px-2 py-1 font-medium transition-transform`,
          'hover:bg-background-light hover:scale-[1.02] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-sm',
        )}
      >
        <div
          className={cn(
            `flex items-center justify-center rounded-md bg-gradient-to-br from-blue-600
            to-blue-400 p-1 text-white shadow-md transition-transform`,
            'group-hover:scale-110',
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
          `border-border bg-background group flex items-center gap-x-1.5 rounded-lg border
          px-2 py-1 font-medium transition-transform`,
          'hover:bg-background-light hover:scale-[1.02] hover:shadow-lg',
          'active:scale-[0.98] active:shadow-sm',
        )}
      >
        <div
          className={cn(
            `flex items-center justify-center rounded-md bg-gradient-to-br from-gray-800
            to-gray-600 p-1 text-white shadow-md transition-transform`,
            'group-hover:scale-110',
          )}
        >
          <Image src="/octocat-white.svg" alt="" width={16} height={16} />
        </div>
        <span className="text-foreground text-sm">GitHub</span>
      </Link>
    </div>
  );
}
