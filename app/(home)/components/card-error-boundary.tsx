"use client";

import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { catchError, type ErrorInfo } from "next/error";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { CardHeader } from "./card-header";

interface CardErrorFallbackProps {
  title: string;
  minHeight?: string;
}

function CardErrorFallback(
  { title, minHeight = "min-h-48" }: CardErrorFallbackProps,
  { retry }: ErrorInfo
) {
  return (
    <Card className="p-5" containerClassName={minHeight}>
      <CardHeader title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <p className="text-foreground-muted text-sm">
          This card couldn&apos;t be loaded.
        </p>
        <button
          className={cn(
            "flex w-fit cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-mirai-red px-3 py-2 text-sm text-white",
            "hover:bg-mirai-red/90 hover:shadow-md",
            "active:scale-[0.98] active:transition-transform!"
          )}
          onClick={() => retry()}
          type="button"
        >
          <ArrowsClockwiseIcon
            aria-hidden="true"
            className="size-4.5 shrink-0"
          />
          <span>Try Again</span>
        </button>
      </div>
    </Card>
  );
}

export const CardErrorBoundary = catchError(CardErrorFallback);
