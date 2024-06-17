"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

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
      {children}
    </NextUIProvider>
  );
}
