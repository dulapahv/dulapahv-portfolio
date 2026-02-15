"use client";

import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { allProjects } from "content-collections";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/card";
import { cn } from "@/lib/utils";

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
        (b as ProjectWithDate).sortDate.getTime() -
        (a as ProjectWithDate).sortDate.getTime()
    )
    .slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
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
        <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
          Recent Projects
        </h2>
        <Link className="group/icon" href="/project" title="View all projects">
          <ArrowRightIcon
            className="size-5 text-foreground-muted transition-colors group-hover/icon:text-mirai-red"
            weight="regular"
          />
        </Link>
      </div>

      <div className="relative">
        {currentProject.image && (
          <Link
            className="group/image relative block overflow-hidden rounded-lg"
            href={`/project/${currentProject.slug}`}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                alt={currentProject.title}
                className="object-cover"
                fill
                quality={25}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={currentProject.image}
              />
            </div>
          </Link>
        )}

        {projects.length > 1 && (
          <>
            <button
              aria-label="Previous project"
              className={cn(
                "absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 hover:bg-background",
                "rounded-full p-2 backdrop-blur-sm transition-all",
                "hover:scale-110"
              )}
              onClick={goToPrevious}
              type="button"
            >
              <CaretLeftIcon className="size-5 text-foreground" weight="bold" />
            </button>
            <button
              aria-label="Next project"
              className={cn(
                "absolute top-1/2 right-2 -translate-y-1/2 bg-background/80 hover:bg-background",
                "rounded-full p-2 backdrop-blur-sm transition-all",
                "hover:scale-110"
              )}
              onClick={goToNext}
              type="button"
            >
              <CaretRightIcon
                className="size-5 text-foreground"
                weight="bold"
              />
            </button>
          </>
        )}
      </div>

      <Link className="group mt-4" href={`/project/${currentProject.slug}`}>
        <h3
          className={cn(
            "block font-semibold text-foreground text-lg transition-colors",
            "group-hover:text-mirai-red"
          )}
        >
          {currentProject.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-foreground-muted text-sm leading-relaxed">
          {currentProject.description}
        </p>
        <time className="mt-2 block text-foreground-muted text-xs">
          {currentProject.formattedStartDate}—{currentProject.formattedEndDate}
          {currentProject.isOngoing && (
            <span className="ml-2 inline-block rounded-full bg-mirai-red/10 px-2 py-0.5 font-medium text-[10px] text-mirai-red uppercase">
              Ongoing
            </span>
          )}
        </time>
      </Link>

      {projects.length > 1 && (
        <div className="mt-auto flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              aria-label={`Go to project ${index + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-6 bg-mirai-red"
                  : "w-2 bg-foreground/20 hover:bg-border"
              )}
              key={`project-dot-${project.slug}`}
              onClick={() => goToSlide(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </Card>
  );
}
