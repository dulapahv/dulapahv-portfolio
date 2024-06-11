"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";

export * from "@nextui-org/react";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
