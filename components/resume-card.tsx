"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useRef, useState } from "react";
import { Card } from "@/components/card";
import { cn } from "@/lib/utils";

export const ResumeCard = () => {
  const documentRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!documentRef.current) {
      return;
    }

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
      className="group block h-full"
      href="https://dulapahv.dev/resume"
      prefetch={false}
      rel="noopener noreferrer"
      target="_blank"
      title="View my résumé"
    >
      <Card
        className="flex h-full flex-col overflow-hidden p-5"
        containerClassName="h-full"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
            Résumé
          </h2>
          <ArrowUpRightIcon
            className="size-5 text-foreground-muted transition-colors group-hover:text-mirai-red"
            weight="regular"
          />
        </div>

        <div
          className="relative flex flex-1 cursor-crosshair items-center justify-center overflow-hidden rounded-md border border-border-subtle"
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ perspective: "1000px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-subtle)_1px,transparent_1px)]"
            style={{
              backgroundSize: "24px 24px",
              backgroundPosition: "center",
            }}
          />

          <div
            aria-hidden="true"
            className={cn(
              "relative h-32 w-24 rounded-sm border border-border bg-background-elevated shadow-xl transition-transform duration-300 ease-out",
              "group-hover:scale-105"
            )}
            ref={documentRef}
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-evenly p-3">
              {[...new Array(6)].map((_, i) => (
                <div className="flex gap-1" key={i}>
                  <div
                    className={cn(
                      "h-0.5 rounded-full bg-foreground/20 transition-all duration-500",
                      i === 0
                        ? "w-3/4"
                        : i === 1
                          ? "w-4/5"
                          : i === 2
                            ? "w-2/3"
                            : i === 3
                              ? "w-3/4"
                              : i === 4
                                ? "w-1/2"
                                : "w-3/5"
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
