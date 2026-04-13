"use client";

import {
  ArrowUpRightIcon,
  CameraIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";

import Zoom from "react-medium-image-zoom";
import { Link } from "@/components/link";
import { cn } from "@/lib/utils";
import { Card } from "../card";
import { CardHeader } from "../card-header";

interface CameraRollCardProps {
  images: string[];
}

export function CameraRollCard({ images }: CameraRollCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const isPaused = isHovering || isManuallyPaused;

  const handleSlideChange = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAnimationKey((prev) => prev + 1);
  };

  const handleBarClick = (index: number) => {
    setCurrentIndex(index);
    setAnimationKey((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setAnimationKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAnimationKey((prev) => prev + 1);
  };

  if (images.length === 0) {
    return (
      <Card className="p-5">
        <CardHeader title="Camera Roll" />
        <div className="flex h-64 items-center justify-center rounded-lg bg-border-subtle">
          <p className="text-foreground-muted text-sm">No images to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <CardHeader
        action={
          <Link
            className="group/icon"
            href="/camera-roll"
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
            title="View my camera roll"
          >
            <ArrowUpRightIcon
              className="size-5 text-foreground-muted transition-colors group-hover/icon:text-mirai-red"
              weight="regular"
            />
          </Link>
        }
        title="Camera Roll"
      />

      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: pause/resume carousel on hover */}
      <section
        aria-label="Camera Roll"
        className="relative mb-4 h-full min-h-64 overflow-hidden rounded-lg xl:min-h-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-2 right-2 left-2 z-10 flex gap-1">
          {images.map((image, index) => (
            <button
              aria-label={`Go to image ${index + 1}`}
              className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
              key={`progress-${image}`}
              onClick={() => handleBarClick(index)}
              type="button"
            >
              <div
                className={cn(
                  "h-full bg-white",
                  index === currentIndex &&
                    "animate-[camera-roll-progress_3s_linear_forwards]"
                )}
                key={
                  index === currentIndex
                    ? `active-${animationKey}`
                    : `done-${index}`
                }
                onAnimationEnd={
                  index === currentIndex ? handleSlideChange : undefined
                }
                style={
                  index === currentIndex
                    ? {
                        animationPlayState: isPaused ? "paused" : "running",
                      }
                    : { width: index < currentIndex ? "100%" : "0%" }
                }
              />
            </button>
          ))}
        </div>

        <button
          aria-label="Previous image"
          className="absolute top-0 bottom-0 left-0 z-5 w-1/6 cursor-pointer"
          onClick={handlePrevious}
          type="button"
        />
        <button
          aria-label="Next image"
          className="absolute top-0 right-0 bottom-0 z-5 w-1/4 cursor-pointer"
          onClick={handleNext}
          type="button"
        />

        <button
          aria-label={isManuallyPaused ? "Resume slideshow" : "Pause slideshow"}
          className="absolute right-2 bottom-2 z-10 cursor-pointer rounded-full bg-background-elevated/50 p-1.5 text-foreground-muted backdrop-blur-sm hover:bg-background-elevated/60 hover:text-foreground"
          onClick={() => setIsManuallyPaused((prev) => !prev)}
          title={isManuallyPaused ? "Resume slideshow" : "Pause slideshow"}
          type="button"
        >
          {isManuallyPaused ? (
            <PlayIcon className="size-4" weight="fill" />
          ) : (
            <PauseIcon className="size-4" weight="fill" />
          )}
        </button>

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="relative size-full shrink-0" key={`image-${image}`}>
              <Zoom
                classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
                wrapElement="span"
                zoomMargin={12}
              >
                <span className="relative block size-full">
                  <Image
                    alt={`Camera Roll image ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={`/camera_roll/${image}`}
                  />
                </span>
              </Zoom>
            </div>
          ))}
        </div>
      </section>

      <Link
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 text-foreground-muted text-sm",
          "hover:text-foreground"
        )}
        href="/camera-roll"
        prefetch={false}
        rel="noopener noreferrer"
        target="_blank"
      >
        <CameraIcon className="size-4" />
        View my camera roll
      </Link>
    </Card>
  );
}
