import Image from "next/image";

interface ThemeAwareImageProps
  extends Omit<React.ComponentProps<typeof Image>, "src"> {
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
