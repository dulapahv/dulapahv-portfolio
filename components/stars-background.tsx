'use client';

import { useEffect, useRef } from 'react';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  glowIntensity: number;
}

// interface ShootingStar {
//   x: number;
//   y: number;
//   length: number;
//   speed: number;
//   angle: number;
//   opacity: number;
//   trailLength: number;
// }

const ALLOWED_PATHS = ['/', '/contact', '/blog', '/project'] as Route[];

export function StarsBackground() {
  const pathname = usePathname();
  const shouldRenderStars = ALLOWED_PATHS.includes(pathname as Route);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // if (!shouldRenderStars) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 10000);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          glowIntensity: Math.random() * 3 + 1
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        drawStar(stars[i]);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      render();
    };

    // const createShootingStar = () => {
    //   const isFromTop = Math.random() > 0.5;
    //   const x = isFromTop ? Math.random() * canvas.width : canvas.width;
    //   const y = isFromTop ? 0 : Math.random() * canvas.height;

    //   shootingStars.push({
    //     x,
    //     y,
    //     length: Math.random() * 80 + 60,
    //     speed: Math.random() * 3 + 4,
    //     angle: Math.random() * Math.PI / 4 + Math.PI / 4,
    //     opacity: 1,
    //     trailLength: Math.random() * 100 + 80
    //   });
    // };

    const drawGlow = (x: number, y: number, baseSize: number, alpha: number, color: string) => {
      // Glow layers
      const layers = 2;
      for (let i = 1; i <= layers; i++) {
        const r = baseSize * (1 + i * 0.4); // bigger radius each layer
        const a = alpha * (0.5 / i); // lower opacity each layer

        ctx.fillStyle = `${color.replace('ALPHA', a.toString())}`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStar = (star: Star) => {
      const alpha = star.opacity;

      // Calculate distance from center for chromatic aberration
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = (star.x - centerX) / centerX;
      const dy = (star.y - centerY) / centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

      // Chromatic aberration strength increases with distance from center
      const chromaticStrength = distanceFromCenter * 4;

      // Normalize direction vector for radial offset
      const directionLength = Math.sqrt(dx * dx + dy * dy);
      const normalizedDx = directionLength > 0 ? dx / directionLength : 0;
      const normalizedDy = directionLength > 0 ? dy / directionLength : 0;

      // Calculate radial offsets
      const offsetX = normalizedDx * chromaticStrength;
      const offsetY = normalizedDy * chromaticStrength;

      // Apply blur filter to the star itself based on distance
      const distance = Math.sqrt((dx / centerX) ** 2 + (dy / centerY) ** 2);
      const sizeMult = 1 + distance * 0.5;
      const baseSize = star.size * sizeMult;

      // Blue channel (inward)
      drawGlow(star.x - offsetX, star.y - offsetY, baseSize, alpha, 'rgba(17,229,240,ALPHA)');

      // Red channel (outward)
      drawGlow(star.x + offsetX, star.y + offsetY, baseSize, alpha, 'rgba(184,7,98,ALPHA)');

      // White channel (main star - center)
      drawGlow(star.x, star.y, baseSize, alpha, 'rgba(241,241,241,ALPHA)');
    };

    // const drawShootingStar = (shootingStar: ShootingStar) => {
    //   const gradient = ctx.createLinearGradient(
    //     shootingStar.x,
    //     shootingStar.y,
    //     shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.trailLength,
    //     shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.trailLength
    //   );

    //   gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
    //   gradient.addColorStop(0.3, `rgba(147, 197, 253, ${shootingStar.opacity * 0.8})`);
    //   gradient.addColorStop(0.6, `rgba(96, 165, 250, ${shootingStar.opacity * 0.4})`);
    //   gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    //   ctx.shadowBlur = 20;
    //   ctx.shadowColor = `rgba(147, 197, 253, ${shootingStar.opacity})`;
    //   ctx.strokeStyle = gradient;
    //   ctx.lineWidth = 2;
    //   ctx.lineCap = 'round';

    //   ctx.beginPath();
    //   ctx.moveTo(shootingStar.x, shootingStar.y);
    //   ctx.lineTo(
    //     shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
    //     shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
    //   );
    //   ctx.stroke();

    //   ctx.shadowBlur = 10;
    //   ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
    //   ctx.beginPath();
    //   ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
    //   ctx.fill();
    // };

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // to revert add: shouldRenderStars

  // if (!shouldRenderStars) {
  //   return null;
  // }

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none fixed inset-0 -z-40',
        shouldRenderStars ? 'animate-stars' : 'animate-fade-out'
      )}
      aria-hidden="true"
    />
  );
}
