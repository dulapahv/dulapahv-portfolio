import * as React from 'react';

import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  size?: number | 'default';
}

const Spinner = ({ className, size = 'default' }: SpinnerProps) => (
  <div
    role="status"
    aria-label="Loading"
    className={cn('[&>div]:bg-foreground size-5', className)}
    style={typeof size === 'number' ? { width: size, height: size } : undefined}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="animate-spinner absolute top-[4.4%] left-[46.5%] h-[24%] w-[7%]
          origin-[center_190%] rounded-full opacity-[0.1] will-change-transform"
        style={{
          transform: `rotate(${i * 30}deg)`,
          animationDelay: `${(i * 0.083).toFixed(3)}s`,
        }}
        aria-hidden="true"
      />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

export { Spinner };
