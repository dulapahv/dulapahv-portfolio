import { Card } from "@/components/card";

interface CardSkeletonProps {
  /** Tailwind min-height class, e.g. `"min-h-48"` or `"min-h-96"`. */
  minHeight?: string;
}

export function CardSkeleton({ minHeight = "min-h-48" }: CardSkeletonProps) {
  return (
    <Card className="relative overflow-hidden" containerClassName={minHeight} />
  );
}
