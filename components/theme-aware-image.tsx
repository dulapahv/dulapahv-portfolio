'use client';

import Image from 'next/image';

import { useTheme } from 'next-themes';

interface ThemeAwareImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  lightSrc: string;
  darkSrc: string;
}

export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  alt,
  ...props
}: ThemeAwareImageProps) {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const src = resolvedTheme === 'light' ? lightSrc : darkSrc;

  return <Image src={src} alt={alt || 'Image'} {...props} />;
}
