"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  EDUCATION_LOCATION,
  TRAVEL_LOCATIONS,
  WORK_LOCATION,
} from "@/lib/constants";
import { Card } from "../card";
import { CardHeader } from "../card-header";

const Globe = dynamic(() => import("./globe").then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <div className="h-80 w-full rounded-lg" />,
});

const GLOBE_MARKERS = [
  ...EDUCATION_LOCATION,
  ...WORK_LOCATION,
  ...TRAVEL_LOCATIONS,
];

export function GlobeCard() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Card className="p-5">
      <CardHeader title="Places I've Been To" />
      <div className="relative -mt-4 flex items-center justify-center">
        <Globe
          className="h-80 w-full cursor-grab overflow-hidden rounded-lg"
          height={320}
          isPaused={isPaused}
          markers={GLOBE_MARKERS}
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
