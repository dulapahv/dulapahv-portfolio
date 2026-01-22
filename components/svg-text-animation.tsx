import { cn } from "@/lib/utils";

interface SvgTextAnimationProps {
  className?: string;
  ariaLabel?: string;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  children: React.ReactNode;
  animationClass?: string;
}

export function SvgTextAnimation({
  className = "",
  ariaLabel = "Animated text",
  width = "100%",
  height = "100%",
  viewBox,
  children,
  animationClass,
}: SvgTextAnimationProps) {
  return (
    <svg
      aria-label={ariaLabel}
      className={cn(animationClass, className)}
      height={height}
      role="img"
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
