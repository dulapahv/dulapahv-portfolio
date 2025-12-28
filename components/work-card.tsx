import Link from 'next/link';

import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

import { LINKEDIN_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  formattedStartDate: string;
  formattedEndDate: string;
  isPresent?: boolean;
}

const works: WorkExperience[] = [
  {
    position: 'Graduate Software Engineer',
    company: 'NatWest Group',
    location: 'Edinburgh, United Kingdom',
    formattedStartDate: 'Sep 2025',
    formattedEndDate: 'Present',
    isPresent: true
  },
  {
    position: 'Software Engineer Intern',
    company: 'NatWest Group',
    location: 'Edinburgh, United Kingdom',
    formattedStartDate: 'Jun 2024',
    formattedEndDate: 'Aug 2024'
  },
  {
    position: 'Front-End Developer',
    company: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    location: 'Bangkok, Thailand',
    formattedStartDate: 'Feb 2023',
    formattedEndDate: 'Jul 2024'
  },
  {
    position: 'Full-Stack Developer Intern',
    company: 'Geo-Informatics and Space Technology Development Agency (GISTDA)',
    location: 'Bangkok, Thailand',
    formattedStartDate: 'Jun 2023',
    formattedEndDate: 'Aug 2023'
  }
];

export function WorkCard() {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Work
        </h2>
        <Link
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="View my LinkedIn profile"
          className="group/icon"
        >
          <ArrowUpRightIcon
            className={cn(
              'text-foreground-muted size-5 transition-colors',
              'group-hover/icon:text-mirai-red'
            )}
            weight="regular"
          />
        </Link>
      </div>
      <div className="relative flex h-full flex-col">
        <div
          className="absolute top-0 left-0 h-full w-px opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, var(--color-foreground) 0, var(--color-foreground) 4px, transparent 4px, transparent 8px)',
            maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
          }}
          aria-hidden="true"
        />
        <ul className="flex h-full flex-1 flex-col text-sm" role="list">
          {works.map((work, index) => (
            <li key={index} className="relative flex flex-col gap-1 pb-3 pl-4 first:pb-3">
              <div
                className="border-foreground/20 absolute top-2.5 left-0 h-px w-3 border-t border-dashed"
                aria-hidden="true"
              />
              <p
                className={cn(
                  'text-foreground flex items-center gap-2 font-medium transition-colors'
                )}
              >
                {index === 0 && work.isPresent && (
                  <span className="relative inline-flex size-1.5 shrink-0">
                    <span
                      className="bg-mirai-red absolute size-1.5 animate-ping rounded-full"
                      aria-hidden="true"
                    />
                    <span
                      className="bg-mirai-red relative size-1.5 rounded-full"
                      aria-hidden="true"
                    />
                  </span>
                )}
                {work.position} at {work.company}
              </p>
              <p className="text-foreground-muted">{work.location}</p>
              <time className="text-foreground-muted text-xs">
                {work.formattedStartDate}—{work.formattedEndDate}
              </time>
            </li>
          ))}
          <li className="mt-auto flex items-center justify-between pl-4">
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('text-foreground-muted transition-colors', 'hover:text-foreground')}
            >
              View full work experience
            </Link>
            <span className="text-foreground-muted ml-2 transition-colors">2020-2023</span>
          </li>
        </ul>
      </div>
    </Card>
  );
}
