'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr';
import { allProjects } from 'content-collections';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

type ProjectWithDate = (typeof allProjects)[number] & {
  sortDate: Date;
  formattedStartDate: string;
  formattedEndDate: string;
  isOngoing: boolean;
};

export function ProjectsCard() {
  const projects = [...allProjects]
    .sort(
      (a, b) =>
        (b as ProjectWithDate).sortDate.getTime() - (a as ProjectWithDate).sortDate.getTime()
    )
    .slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex] as ProjectWithDate;

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Recent Projects
        </h2>
        <Link href="/project" title="View all projects" className="group/icon">
          <ArrowRightIcon
            className="text-foreground-muted group-hover/icon:text-mirai-red size-5 transition-colors"
            weight="regular"
          />
        </Link>
      </div>

      <div className="relative">
        {currentProject.image && (
          <Link
            href={`/project/${currentProject.slug}`}
            className="group/image relative block overflow-hidden rounded-lg"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={currentProject.image}
                alt={currentProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}

        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                'bg-background/80 hover:bg-background absolute top-1/2 left-2 -translate-y-1/2',
                'rounded-full p-2 backdrop-blur-sm transition-all',
                'hover:scale-110'
              )}
              aria-label="Previous project"
            >
              <CaretLeftIcon className="text-foreground size-5" weight="bold" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                'bg-background/80 hover:bg-background absolute top-1/2 right-2 -translate-y-1/2',
                'rounded-full p-2 backdrop-blur-sm transition-all',
                'hover:scale-110'
              )}
              aria-label="Next project"
            >
              <CaretRightIcon className="text-foreground size-5" weight="bold" />
            </button>
          </>
        )}
      </div>

      <div className="mt-4">
        <Link
          href={`/project/${currentProject.slug}`}
          className={cn(
            'text-foreground block text-lg font-semibold transition-colors',
            'hover:text-mirai-red'
          )}
        >
          {currentProject.title}
        </Link>
        <p className="text-foreground-muted mt-2 line-clamp-2 text-sm leading-relaxed">
          {currentProject.description}
        </p>
        <time className="text-foreground-muted mt-2 block text-xs">
          {currentProject.formattedStartDate}—{currentProject.formattedEndDate}
          {currentProject.isOngoing && (
            <span
              className="bg-mirai-red/10 text-mirai-red ml-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium
                uppercase"
            >
              Ongoing
            </span>
          )}
        </time>
      </div>

      {projects.length > 1 && (
        <div className="mt-auto flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === currentIndex ? 'bg-mirai-red w-6' : 'bg-foreground/20 hover:bg-border w-2'
              )}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
