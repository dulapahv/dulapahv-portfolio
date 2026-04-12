import type { ReactNode } from "react";

import { RELATIVE_MOUSE_CLASSNAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CardProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "div" | "article";
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Card({
  children,
  className = "",
  containerClassName = "",
  as = "div",
  id,
  ref,
}: CardProps) {
  const Component = as;

  return (
    <Component
      className={cn(
        "relative h-full rounded-xl bg-border p-px",
        containerClassName
      )}
      id={id}
      ref={ref}
    >
      <div
        className={cn(
          `${RELATIVE_MOUSE_CLASSNAME} pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500`
        )}
        style={{
          background:
            "linear-gradient(to bottom right, var(--color-mirai-red), var(--color-mirai-blue), var(--color-mirai-yellow))",
          maskImage:
            "radial-gradient(50% 50% at var(--mouse-x, 9999px) var(--mouse-y, 9999px), rgba(0, 0, 0, 0.5) 40%, transparent)",
          WebkitMaskImage:
            "radial-gradient(50% 50% at var(--mouse-x, 9999px) var(--mouse-y, 9999px), rgba(0, 0, 0, 0.5) 40%, transparent)",
        }}
      />
      <div
        className={cn(
          "card relative z-1 flex h-full flex-col rounded-xl bg-background-elevated",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}
