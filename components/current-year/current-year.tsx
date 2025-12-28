"use client";

export function CurrentYear() {
  const currentYear = new Date().getFullYear();
  return <>{currentYear}</>;
}
