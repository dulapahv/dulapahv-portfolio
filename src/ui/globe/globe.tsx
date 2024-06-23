"use client";

import type { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";
import createGlobe from "cobe";

type GlobeProps = {
  readonly width: number;
  readonly height: number;
  readonly markers: COBEOptions["markers"];
};

export const Globe = ({ width, height, markers }: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) {
      return undefined;
    }

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      baseColor: [0.14902, 0.14902, 0.14902],
      markerColor: [0.98431, 0.33725, 0.54118],
      glowColor: [0.96078, 0.96078, 0.96078],
      markers,
      onRender: (state) => {
        if (pointerInteracting.current) {
          state.phi = r.get();
          phi = state.phi;
        } else {
          state.phi = phi;
          r.set((phi += 0.002));
        }
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [width, height]);

  return (
    <canvas
      aria-label="Globe"
      ref={canvasRef}
      className="aspect-[4/3] w-full max-w-96"
      onPointerDown={(e) => {
        pointerInteracting.current =
          e.clientX - pointerInteractionMovement.current;
        canvasRef.current && (canvasRef.current.style.cursor = "grabbing");
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        canvasRef.current && (canvasRef.current.style.cursor = "grab");
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        canvasRef.current && (canvasRef.current.style.cursor = "grab");
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          api.start({
            r: delta / 200,
          });
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          api.start({
            r: delta / 100,
          });
        }
      }}
    />
  );
};
