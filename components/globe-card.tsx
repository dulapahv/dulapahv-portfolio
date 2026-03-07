"use client";

import dynamic from "next/dynamic";
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
  return (
    <Card className="p-5">
      <h2 className="mb-4 font-semibold text-foreground-muted text-xs uppercase tracking-widest">
        Places I&apos;ve Been To
      </h2>
      <div className="-mt-4 flex items-center justify-center">
        <Globe
          className="h-80 w-full cursor-grab overflow-hidden rounded-lg"
          height={320}
          markers={[
            ...EDUCATION_LOCATION,
            ...WORK_LOCATION,
            ...TRAVEL_LOCATIONS,
          ]}
          width={384}
        />
      </div>
    </Card>
  );
}
