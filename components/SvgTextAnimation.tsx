'use client';

import { useEffect, useRef } from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';

interface SvgTextAnimationFlexibleProps {
  delay?: number;
  startDelay?: number;
  duration?: number;
  strokeWidth?: number;
  timingFunction?: string;
  strokeColor?: string;
  fillColor?: string;
  letterSpacing?: number;
  repeat?: boolean;
  className?: string;
  ariaLabel?: string;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  children: React.ReactNode;
}

export const SvgTextAnimationFlexible = ({
  delay = 0.1,
  startDelay = 0,
  duration = 2,
  strokeWidth = 1.5,
  timingFunction = 'ease-in-out',
  strokeColor = '#ffffff',
  fillColor = '#ffffff',
  letterSpacing = 0,
  repeat = false,
  className = '',
  ariaLabel = 'Animated text',
  width = '100%',
  height = '100%',
  viewBox,
  children
}: SvgTextAnimationFlexibleProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    const paths = svgRef.current.querySelectorAll('path');
    const mode = repeat ? 'infinite' : 'forwards';

    paths.forEach((path, i) => {
      const length = path.getTotalLength();

      if (letterSpacing > 0) {
        path.style.transform = `translateX(${i * letterSpacing}px)`;
      }

      path.style.strokeDashoffset = `${length}px`;
      path.style.strokeDasharray = `${length}px`;
      path.style.strokeWidth = `${strokeWidth}px`;
      path.style.stroke = strokeColor;
      path.style.animation = `svg-text-anim ${duration}s ${mode} ${timingFunction}`;
      path.style.animationDelay = `${startDelay + i * delay}s`;
    });
  }, [
    delay,
    startDelay,
    duration,
    strokeWidth,
    timingFunction,
    strokeColor,
    repeat,
    prefersReducedMotion
  ]);

  // If user prefers reduced motion, remove animation styles from paths
  useEffect(() => {
    if (!svgRef.current || !prefersReducedMotion) return;

    const paths = svgRef.current.querySelectorAll('path');
    paths.forEach(path => {
      path.style.fill = fillColor;
      path.style.stroke = 'none';
    });
  }, [prefersReducedMotion, fillColor]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {children}
    </svg>
  );
};
