'use client';

import { useEffect, useRef } from 'react';

import { useSpring } from '@react-spring/web';
import createGlobe, { type COBEOptions } from 'cobe';
import { useTheme } from 'next-themes';

interface GlobeProps {
  readonly width: number;
  readonly height: number;
  readonly markers: COBEOptions['markers'];
  className?: string;
}

export const Globe = ({
  width,
  height,
  markers,
  className = '',
}: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);

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
    if (!canvasRef.current) return undefined;

    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0,
      dark: resolvedTheme === 'light' ? 0 : 1,
      diffuse: 1.2,
      mapSamples: 16_000,
      mapBrightness: 6,
      opacity: 0.85,
      offset: [0, 65],
      baseColor:
        resolvedTheme === 'light'
          ? [0.98039, 0.98039, 0.98039]
          : [0.3, 0.3, 0.3],
      markerColor: [0.98431, 0.33725, 0.54118],
      glowColor:
        resolvedTheme === 'light'
          ? [0.83137, 0.83137, 0.83137]
          : [0.96078, 0.96078, 0.96078],
      markers,
      onRender: (state) => {
        if (pointerInteracting.current) {
          state.phi = r.get();
          phiRef.current = state.phi;
        } else {
          state.phi = phiRef.current;
          r.set((phiRef.current += 0.002));
        }
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [width, height, resolvedTheme]);

  return (
    <canvas
      aria-label="Globe"
      ref={canvasRef}
      className={className}
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX;
        pointerInteractionMovement.current = 0;
        phiRef.current = r.get();
        // eslint-disable-next-line
        canvasRef.current && (canvasRef.current.style.cursor = 'grabbing');
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        // eslint-disable-next-line
        canvasRef.current && (canvasRef.current.style.cursor = 'grab');
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        // eslint-disable-next-line
        canvasRef.current && (canvasRef.current.style.cursor = 'grab');
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          api.start({
            r: phiRef.current + delta / 400,
          });
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          api.start({
            r: phiRef.current + delta / 200,
          });
        }
      }}
    />
  );
};
