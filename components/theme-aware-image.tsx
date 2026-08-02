import Image from "next/image";
import type { ComponentProps } from "react";

interface ThemeAwareImageProps
  extends Omit<ComponentProps<typeof Image>, "src"> {
  lightSrc: string;
  darkSrc: string;
}

export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  className = "",
  ...props
}: ThemeAwareImageProps) {
  return (
    <>
      <Image
        className={`hidden dark:block ${className}`}
        src={darkSrc}
        {...props}
      />
      <Image
        className={`block dark:hidden ${className}`}
        src={lightSrc}
        {...props}
      />
    </>
  );
}
