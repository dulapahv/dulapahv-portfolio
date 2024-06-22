"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";

import fallbackImage from "/public/fallback.jpg";

interface StackIconWrapperProps extends ImageProps {
  fallback?: ImageProps["src"];
  forceLightTheme?: boolean;
}

export function StackIconWrapper({
  src,
  fallback = fallbackImage,
  forceLightTheme = true,
  ...props
}: StackIconWrapperProps) {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  const { resolvedTheme } = useTheme();

  src =
    !forceLightTheme && resolvedTheme === "dark"
      ? (src as string).replace(/(\.\w+)$/, "-dark$1")
      : src;

  useEffect(() => {
    setError(null);
  }, [src]);

  return <Image onError={setError} src={error ? fallback : src} {...props} />;
}
