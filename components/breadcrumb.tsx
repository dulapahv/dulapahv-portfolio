'use client';

import React from 'react';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react/dist/ssr';

import { cn } from '@/lib/utils';

// Helper function to format segment text
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Main dynamic breadcrumb component
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
    homeLabel?: string;
    lastLabel?: string;
    className?: string;
  }
>(({ separator, homeLabel = 'Home', lastLabel, className, ...props }, ref) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{homeLabel}</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-48 truncate">
                    {lastLabel ?? label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href as Route}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </nav>
  );
});
Breadcrumb.displayName = 'Breadcrumb';

// Static breadcrumb wrapper for manual control
const BreadcrumbStatic = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
);
BreadcrumbStatic.displayName = 'BreadcrumbStatic';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'text-foreground-muted flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5',
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  if (asChild) {
    return <React.Fragment {...props} />;
  }

  return (
    <Link
      ref={ref}
      className={cn(
        'rounded-sm transition-colors',
        'hover:text-foreground focus:text-foreground',
        className
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <CaretRightIcon />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}
  >
    <DotsThreeIcon className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

// Export the dynamic breadcrumb as default
export default Breadcrumb;

// Export individual components for custom implementations
export {
  Breadcrumb,
  BreadcrumbStatic,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
};
