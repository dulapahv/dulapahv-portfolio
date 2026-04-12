import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn("@container overflow-hidden", className)}>
      <div className="inline-block min-w-full whitespace-nowrap motion-safe:animate-[marquee-scroll_12s_linear_infinite_alternate] motion-reduce:animate-none">
        {children}
      </div>
    </div>
  );
}
