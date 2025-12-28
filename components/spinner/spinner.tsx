import type * as React from "react";

import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "primary" | "secondary";
  size?: number | "default";
}

export function Spinner({ className, size = "default" }: SpinnerProps) {
  return (
    <div
      aria-label="Loading"
      className={cn("size-5 [&>div]:bg-foreground", className)}
      role="status"
      style={
        typeof size === "number" ? { width: size, height: size } : undefined
      }
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          aria-hidden="true"
          className="absolute top-[4.4%] left-[46.5%] h-[24%] w-[7%] origin-[center_190%] animate-spinner rounded-full opacity-[0.1] will-change-transform"
          key={i}
          style={{
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${(i * 0.083).toFixed(3)}s`,
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
