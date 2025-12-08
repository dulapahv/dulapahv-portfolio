'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  glowIntensity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
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

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    // let shootingStars: ShootingStar[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 10000);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          glowIntensity: Math.random() * 3 + 1,
          twinkleSpeed: Math.random() * 0.003 + 0.0005,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }
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

    const drawStar = (star: Star, time: number) => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      const alpha = star.opacity * twinkle;

      // Calculate distance from center for chromatic aberration
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = (star.x - centerX) / centerX;
      const dy = (star.y - centerY) / centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

      // Chromatic aberration strength increases with distance from center
      const chromaticStrength = distanceFromCenter * 4;
      const offsetDirection = dx; // Use horizontal distance for offset direction

      const chromaticOffset = {
        r: offsetDirection * chromaticStrength,
        g: 0,
        b: -offsetDirection * chromaticStrength
      };

      const shadowBlur = star.glowIntensity * star.size * 3;

      ctx.shadowBlur = shadowBlur;

      // Blue channel
      ctx.shadowColor = `rgba(59, 130, 246, ${alpha})`;
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.9})`;
      ctx.beginPath();
      ctx.arc(star.x + chromaticOffset.b, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // Red channel
      ctx.shadowColor = `rgba(239, 68, 68, ${alpha})`;
      ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.9})`;
      ctx.beginPath();
      ctx.arc(star.x + chromaticOffset.r, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      // White channel (main star)
      ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x + chromaticOffset.g, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
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

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        drawStar(stars[i], time);
      }

      // Shooting stars disabled
      // shootingStars = shootingStars.filter(shootingStar => {
      //   drawShootingStar(shootingStar);

      //   shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
      //   shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
      //   shootingStar.opacity -= 0.005;

      //   return (
      //     shootingStar.opacity > 0 &&
      //     shootingStar.x < canvas.width + 100 &&
      //     shootingStar.y < canvas.height + 100
      //   );
      // });

      // if (Math.random() < 0.01) {
      //   createShootingStar();
      // }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animate-fade-in-stars pointer-events-none fixed inset-0 -z-40"
      aria-hidden="true"
    />
  );
}
