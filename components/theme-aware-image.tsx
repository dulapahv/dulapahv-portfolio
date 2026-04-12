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
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        className={`hidden dark:block ${className}`}
        src={darkSrc}
        {...props}
      />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        className={`block dark:hidden ${className}`}
        src={lightSrc}
        {...props}
      />
    </>
  );
}
