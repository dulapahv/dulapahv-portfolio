'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

export const ResumeCard = () => {
  const documentRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!documentRef.current) return;

    const card = documentRef.current;
    const rect = card.getBoundingClientRect();

    // Get mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Calculate rotation (subtle effect)
    const rotateY = (x / rect.width) * 20; // Max 20 degrees
    const rotateX = -(y / rect.height) * 20; // Max 20 degrees

    setRotateY(rotateY);
    setRotateX(rotateX);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link
      href="https://dulapahv.dev/resume"
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      title="View my résumé"
      className="group block h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden p-5" containerClassName="h-full">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
            Résumé
          </h2>
          <ArrowUpRightIcon
            className="text-foreground-muted group-hover:text-mirai-red size-5 transition-colors"
            weight="regular"
          />
        </div>

        <div
          className="border-border-subtle relative flex flex-1 cursor-crosshair items-center justify-center
            overflow-hidden rounded-md border"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <div
            className="pointer-events-none absolute inset-0
              bg-[linear-gradient(to_right,var(--color-border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-subtle)_1px,transparent_1px)]"
            style={{
              backgroundSize: '24px 24px',
              backgroundPosition: 'center'
            }}
            aria-hidden="true"
          />

          <div
            ref={documentRef}
            className={cn(
              `border-border bg-background-elevated relative h-32 w-24 rounded-sm border shadow-xl
              transition-transform duration-300 ease-out`,
              'group-hover:scale-105'
            )}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex flex-col justify-evenly p-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex gap-1">
                  <div
                    className={cn(
                      'bg-foreground/20 h-0.5 rounded-full transition-all duration-500',
                      i === 0
                        ? 'w-3/4'
                        : i === 1
                          ? 'w-4/5'
                          : i === 2
                            ? 'w-2/3'
                            : i === 3
                              ? 'w-3/4'
                              : i === 4
                                ? 'w-1/2'
                                : 'w-3/5'
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
