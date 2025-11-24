'use client';

import { forwardRef, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { relativeMouseClassname } from './MousePositionSetter';

interface CardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: 'div' | 'article';
  id?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className = '', containerClassName = '', as = 'div', id },
  ref
) {
  const Component = as;
  const borderRef = useRef<HTMLDivElement>(null);

  return (
    <Component
      ref={ref}
      className={cn('bg-border relative h-full rounded-xl p-px', containerClassName)}
      id={id}
    >
      <div
        ref={borderRef}
        className={cn(
          `${relativeMouseClassname} pointer-events-none absolute inset-0 rounded-xl transition-opacity
          duration-500`
        )}
        style={{
          background:
            'linear-gradient(to bottom right, var(--color-mirai-red), var(--color-mirai-blue), var(--color-mirai-yellow))',
          maskImage:
            'radial-gradient(50% 50% at var(--mouse-x, 9999px) var(--mouse-y, 9999px), rgba(0, 0, 0, 0.5) 40%, transparent)',
          WebkitMaskImage:
            'radial-gradient(50% 50% at var(--mouse-x, 9999px) var(--mouse-y, 9999px), rgba(0, 0, 0, 0.5) 40%, transparent)'
        }}
      />
      <div
        className={cn(
          'card bg-background-elevated relative z-1 flex h-full flex-col rounded-xl',
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
});
