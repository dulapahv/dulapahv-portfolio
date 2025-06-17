import Image from 'next/image';

interface ThemeAwareImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  lightSrc: string;
  darkSrc: string;
}

export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  className = '',
  ...props
}: ThemeAwareImageProps) {
  return (
    <>
      <Image
        src={darkSrc}
        className={`hidden dark:block ${className}`}
        {...props}
      />
      <Image
        src={lightSrc}
        className={`block dark:hidden ${className}`}
        {...props}
      />
    </>
  );
}
