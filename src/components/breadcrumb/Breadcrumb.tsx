"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoChevronRight } from "react-icons/go";

interface BreadcrumbProps {
  lastItem?: string;
}

const Breadcrumb = ({ lastItem }: BreadcrumbProps) => {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);

  if (lastItem) {
    pathSegments[pathSegments.length - 1] = lastItem;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-x-1.5 text-sm capitalize">
        <BreadcrumbItem href="/" label="Home" />
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return (
            <BreadcrumbItem
              key={path}
              href={path}
              label={segment}
              isLast={isLast}
            />
          );
        })}
      </ol>
    </nav>
  );
};

interface BreadcrumbItemProps {
  href: string;
  label: string;
  isLast?: boolean;
}

const BreadcrumbItem = ({
  href,
  label,
  isLast = false,
}: BreadcrumbItemProps) => {
  const style =
    "inline-block max-w-52 sm:max-w-64 overflow-hidden text-ellipsis whitespace-nowrap";

  return (
    <li className="flex items-center gap-x-1.5">
      {isLast ? (
        <span className={`${style} font-medium text-primary`}>{label}</span>
      ) : (
        <Link
          href={href}
          className={`${style} text-primary/80 hover:underline`}
        >
          {label}
        </Link>
      )}
      {!isLast && <GoChevronRight className="text-lg text-primary/80" />}
    </li>
  );
};

export default Breadcrumb;
