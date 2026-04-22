import type { ReactNode, Ref } from "react";

import { RELATIVE_MOUSE_CLASSNAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CardProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "div" | "article";
  id?: string;
  ref?: Ref<HTMLDivElement>;
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
          `${RELATIVE_MOUSE_CLASSNAME} mask-[radial-gradient(50%_50%_at_var(--mouse-x,9999px)_var(--mouse-y,9999px),rgba(0,0,0,0.5)_40%,transparent)] pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br from-mirai-red via-mirai-blue to-mirai-yellow transition-opacity duration-500`
        )}
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
