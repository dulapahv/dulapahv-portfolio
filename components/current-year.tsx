'use client';

export default function CurrentYear() {
  const currentYear = new Date().getFullYear();
  return <>{currentYear}</>;
}
