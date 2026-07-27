"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface GlobeProps {
  readonly width: number;
  readonly height: number;
  readonly markers: COBEOptions["markers"];
  className?: string;
  isPaused?: boolean;
}

const DRAG_LERP = 0.08;

export function Globe({
  width,
  height,
  markers,
  className,
  isPaused,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(-4);
  const rRef = useRef(0);
  const rTargetRef = useRef(0);
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    let currentWidth = width;

    const onResize = () => {
      if (canvasRef.current) {
        currentWidth = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: currentWidth * 2,
      height: height * 2,
      phi: phiRef.current,
      theta: 0,
      dark: resolvedTheme === "light" ? 0 : 1,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      opacity: 0.85,
      offset: [0, 75],
      baseColor:
        resolvedTheme === "light"
          ? [0.980_39, 0.980_39, 0.980_39]
          : [0.3, 0.3, 0.3],
      markerColor: [0.984_31, 0.337_25, 0.541_18],
      glowColor:
        resolvedTheme === "light"
          ? [0.831_37, 0.831_37, 0.831_37]
          : [0.960_78, 0.960_78, 0.960_78],
      markers,
      onRender: (state) => {
        // Auto-rotate when not dragging and not paused
        if (!(pointerInteracting.current || isPausedRef.current)) {
          phiRef.current += 0.002;
        }

        // Ease current rotation offset toward drag target
        rRef.current += (rTargetRef.current - rRef.current) * DRAG_LERP;

        state.phi = phiRef.current + rRef.current;
        state.width = currentWidth * 2;
        state.height = height * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [width, height, resolvedTheme, markers]);

  return (
    <canvas
      aria-label="Globe"
      className={className}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          rTargetRef.current = delta / 200;
        }
      }}
      onPointerDown={(e) => {
        pointerInteracting.current =
          e.clientX - pointerInteractionMovement.current;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grabbing";
        }
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grab";
        }
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) {
          canvasRef.current.style.cursor = "grab";
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          rTargetRef.current = delta / 100;
        }
      }}
      ref={canvasRef}
    />
  );
}
