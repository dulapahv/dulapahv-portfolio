"use client";

import { domAnimation, LazyMotion } from "motion/react";
import type { ReactNode } from "react";

export function LazyMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
