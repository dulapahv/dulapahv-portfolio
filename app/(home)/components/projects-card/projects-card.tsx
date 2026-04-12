"use client";

import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/components/link";
import type { Project } from "@/lib/content-utils/content-utils";
import { cn } from "@/lib/utils";
import { Card } from "../card";
import { CardHeader, CardHeaderIconLink } from "../card-header";

export type ProjectCardItem = Pick<
  Project,
  | "slug"
  | "title"
  | "description"
  | "image"
  | "formattedStartDate"
  | "formattedEndDate"
  | "isOngoing"
>;

interface ProjectsCardProps {
  readonly projects: readonly ProjectCardItem[];
}

export function ProjectsCard({ projects }: ProjectsCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

  const goToSlide = (index: number) => setCurrentIndex(index);

  if (!projects || projects.length === 0) {
    return null;
  }

  const currentProject = projects[currentIndex];

  return (
    <Card className="p-5">
      <CardHeader
        action={
          <CardHeaderIconLink
            href="/project"
            icon={ArrowRightIcon}
            title="View all projects"
          />
        }
        title="Recent Projects"
      />

      <div className="relative">
        {currentProject.image ? (
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
        ) : null}

        {projects.length > 1 ? (
          <>
            <button
              aria-label="Previous project"
              className={cn(
                "absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 hover:bg-background",
                "rounded-full p-2 backdrop-blur-sm"
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
                "rounded-full p-2 backdrop-blur-sm"
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
        ) : null}
      </div>

      <Link className="group mt-4" href={`/project/${currentProject.slug}`}>
        <h3
          className={cn(
            "block font-semibold text-foreground text-lg",
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
          {currentProject.isOngoing ? (
            <span className="ml-2 inline-block rounded-full bg-mirai-red/10 px-2 py-0.5 font-medium text-[10px] text-mirai-red uppercase">
              Ongoing
            </span>
          ) : null}
        </time>
      </Link>

      {projects.length > 1 ? (
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
      ) : null}
    </Card>
  );
}
