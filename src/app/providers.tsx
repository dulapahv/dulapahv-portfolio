"use client";

import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export * from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode;
  className?: string;
}

export function Providers({ children, className }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push} className={className}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </NextUIProvider>
  );
}
