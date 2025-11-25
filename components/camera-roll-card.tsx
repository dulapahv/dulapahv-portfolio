'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Zoom from 'react-medium-image-zoom';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

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
  }, [currentIndex]);

  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const duration = 3000;
    const updateInterval = 30;
    const increment = (updateInterval / duration) * 100;

    const interval = setInterval(() => {
      progressRef.current += increment;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentIndex(prev => (prev + 1) % images.length);
      }

      forceUpdate({});
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const handleBarClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="text-foreground-muted mb-4 text-xs font-semibold tracking-widest uppercase">
          Camera Roll
        </h2>
        <div className="bg-border-subtle flex h-64 items-center justify-center rounded-lg">
          <p className="text-foreground-muted text-sm">No images to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <h2 className="text-foreground-muted mb-4 text-xs font-semibold tracking-widest uppercase">
        Camera Roll
      </h2>
      <div
        className="relative h-64 min-h-[512px] overflow-hidden rounded-lg xl:min-h-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute top-2 right-2 left-2 z-10 flex gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBarClick(index)}
              className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
              aria-label={`Go to image ${index + 1}`}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    index < currentIndex
                      ? '100%'
                      : index === currentIndex
                        ? `${progressRef.current}%`
                        : '0%'
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={handlePrevious}
          className="absolute top-0 bottom-0 left-0 z-5 w-1/6 cursor-pointer"
          aria-label="Previous image"
        />
        <button
          onClick={handleNext}
          className="absolute top-0 right-0 bottom-0 z-5 w-1/4 cursor-pointer"
          aria-label="Next image"
        />

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative h-full w-full shrink-0">
              <Zoom
                zoomMargin={12}
                wrapElement="span"
                classDialog='[&_[data-rmiz-modal-overlay="visible"]]:!bg-background/40 [&_[data-rmiz-modal-overlay="visible"]]:backdrop-blur-sm'
              >
                <Image
                  src={`/camera_roll/${image}`}
                  alt={`Camera Roll image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>

      <span
        className={cn(
          'text-foreground-muted mt-auto inline-block text-sm transition-colors',
          'hover:text-foreground'
        )}
      >
        View all photos (Coming Soon)
      </span>
    </Card>
  );
}
