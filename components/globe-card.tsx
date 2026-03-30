"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Card } from "@/components/card";
import {
  EDUCATION_LOCATION,
  TRAVEL_LOCATIONS,
  WORK_LOCATION,
} from "@/lib/constants";

const Globe = dynamic(
  () => import("@/components/globe").then((mod) => mod.Globe),
  {
    ssr: false,
    loading: () => <div className="h-80 w-full rounded-lg" />,
  }
);

export function GlobeCard() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Card className="p-5">
      <h2 className="mb-4 font-semibold text-foreground-muted text-xs uppercase tracking-widest">
        Places I&apos;ve Been To
      </h2>
      <div className="relative -mt-4 flex items-center justify-center">
        <Globe
          className="h-80 w-full cursor-grab overflow-hidden rounded-lg"
          height={320}
          isPaused={isPaused}
          markers={[
            ...EDUCATION_LOCATION,
            ...WORK_LOCATION,
            ...TRAVEL_LOCATIONS,
          ]}
          width={384}
        />
        <button
          aria-label={
            isPaused ? "Resume globe rotation" : "Pause globe rotation"
          }
          className="absolute right-2 bottom-2 z-10 cursor-pointer rounded-full bg-foreground/5 p-1.5 text-foreground-muted backdrop-blur-sm hover:bg-foreground/10 hover:text-foreground"
          onClick={() => setIsPaused((prev) => !prev)}
          title={isPaused ? "Resume globe rotation" : "Pause globe rotation"}
          type="button"
        >
          {isPaused ? (
            <PlayIcon className="size-4" weight="fill" />
          ) : (
            <PauseIcon className="size-4" weight="fill" />
          )}
        </button>
      </div>
    </Card>
  );
}
