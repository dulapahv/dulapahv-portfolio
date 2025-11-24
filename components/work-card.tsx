import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

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
    formattedStartDate: 'Feb 2024',
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
        <a
          href="https://www.linkedin.com/in/dulapahv/"
          target="_blank"
          rel="noopener noreferrer"
          title="View my LinkedIn profile"
          className="group/icon"
        >
          <ArrowUpRightIcon
            className={cn(
              'text-foreground-muted transition-color size-5',
              'group-hover/icon:text-mirai-red'
            )}
            weight="regular"
          />
        </a>
      </div>
      <ul className="divide-border-subtle space-y-3 divide-y" role="list">
        {works.map((work, index) => (
          <li key={index} className="flex flex-col gap-1 pb-3 first:pb-3">
            <p
              className={cn(
                'text-foreground flex items-center gap-2 text-sm font-medium transition-colors'
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
            <p className="text-foreground-muted text-xs">{work.location}</p>
            <time className="text-foreground-muted text-xs">
              {work.formattedStartDate}—{work.formattedEndDate}
            </time>
          </li>
        ))}
        <li className="mt-2 flex items-center justify-between">
          <a
            href="https://www.linkedin.com/in/dulapahv/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-foreground-muted text-sm font-medium transition-colors',
              'hover:text-foreground'
            )}
          >
            View full work experience
          </a>
          <span className="text-foreground-muted ml-2 text-sm font-medium transition-colors">
            2020-2023
          </span>
        </li>
      </ul>
    </Card>
  );
}
