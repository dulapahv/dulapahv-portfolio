"use client";

import { useSpring } from "@react-spring/web";
import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface GlobeProps {
  readonly width: number;
  readonly height: number;
  readonly markers: COBEOptions["markers"];
  className?: string;
}

export function Globe({ width, height, markers, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(-4);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

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
        // Auto-rotate when not dragging
        if (!pointerInteracting.current) {
          phiRef.current += 0.002;
        }

        // Apply the rotation with spring offset
        state.phi = phiRef.current + r.get();
        state.width = currentWidth * 2;
        state.height = height * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [width, height, resolvedTheme, markers, r]);

  return (
    <canvas
      aria-label="Globe"
      className={className}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          api.start({
            r: delta / 200,
          });
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
          api.start({
            r: delta / 100,
          });
        }
      }}
      ref={canvasRef}
    />
  );
}
