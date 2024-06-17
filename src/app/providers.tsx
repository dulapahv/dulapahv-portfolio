"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

export * from "@nextui-org/react";

interface ProvidersProps {
  children: ReactNode;
  className?: string;
}

export function Providers(props: ProvidersProps) {
  const { children, className } = props;

  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push} className={className}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </NextUIProvider>
  );
}
