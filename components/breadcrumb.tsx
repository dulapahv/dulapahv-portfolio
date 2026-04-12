import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  Fragment,
  type ReactNode,
} from "react";

import { Link } from "@/components/link";
import { cn } from "@/lib/utils";

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  pathname: string;
  separator?: ReactNode;
  homeLabel?: string;
  lastLabel?: string;
  className?: string;
}

function Breadcrumb({
  pathname,
  separator,
  homeLabel = "Home",
  lastLabel,
  className,
  ...props
}: BreadcrumbProps) {
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className={className} {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{homeLabel}</BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <Fragment key={segment}>
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-48 truncate">
                    {lastLabel ?? label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </nav>
  );
}

function BreadcrumbStatic(props: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="breadcrumb" {...props} />;
}

function BreadcrumbList({
  className,
  ...props
}: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-foreground-muted text-sm sm:gap-2.5",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        "rounded-sm",
        "hover:text-foreground focus:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      aria-current="page"
      aria-disabled="true"
      className={cn("font-normal text-foreground", className)}
      tabIndex={0}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      role="presentation"
      {...props}
    >
      {children ?? <CaretRightIcon />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      role="presentation"
      {...props}
    >
      <DotsThreeIcon className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export default Breadcrumb;

export {
  Breadcrumb,
  BreadcrumbStatic,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
