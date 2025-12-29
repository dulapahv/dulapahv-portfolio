"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Zoom from "react-medium-image-zoom";
import { Card } from "@/components/card";
import { cn } from "@/lib/utils";

interface CameraRollCardProps {
  images: string[];
}

export function CameraRollCard({ images }: CameraRollCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(0);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    progressRef.current = 0;
  }, []);

  useEffect(() => {
    if (images.length === 0 || isPaused) {
      return;
    }

    const duration = 3000;
    const updateInterval = 30;
    const increment = (updateInterval / duration) * 100;

    const interval = setInterval(() => {
      progressRef.current += increment;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }

      forceUpdate({});
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const handleBarClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="mb-4 font-semibold text-foreground-muted text-xs uppercase tracking-widest">
          Camera Roll
        </h2>
        <div className="flex h-64 items-center justify-center rounded-lg bg-border-subtle">
          <p className="text-foreground-muted text-sm">No images to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <h2 className="mb-4 font-semibold text-foreground-muted text-xs uppercase tracking-widest">
        Camera Roll
      </h2>
      <div
        className="relative mb-4 h-64 min-h-128 overflow-hidden rounded-lg xl:min-h-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute top-2 right-2 left-2 z-10 flex gap-1">
          {images.map((_, index) => (
            <button
              aria-label={`Go to image ${index + 1}`}
              className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
              key={index}
              onClick={() => handleBarClick(index)}
              type="button"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    index < currentIndex
                      ? "100%"
                      : index === currentIndex
                        ? `${progressRef.current}%`
                        : "0%",
                }}
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

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="relative h-full w-full shrink-0" key={index}>
              <Zoom
                classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
                wrapElement="span"
                zoomMargin={12}
              >
                <Image
                  alt={`Camera Roll image ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={`/camera_roll/${image}`}
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>

      <span
        className={cn(
          "mt-auto inline-block text-foreground-muted text-sm transition-colors",
          "hover:text-foreground"
        )}
      >
        View all photos (Coming Soon)
      </span>
    </Card>
  );
}
