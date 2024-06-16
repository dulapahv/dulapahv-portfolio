"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

interface BreadcrumbProps {
  lastItem?: string;
}

const Breadcrumb = ({ lastItem }: BreadcrumbProps) => {
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const pathSegments = pathname.split("/").slice(1);

  if (lastItem) {
    pathSegments[pathSegments.length - 1] = lastItem;
  }

  return (
    <Breadcrumbs
      color="primary"
      underline="hover"
      maxItems={4}
      itemsBeforeCollapse={2}
      itemsAfterCollapse={2}
      classNames={{
        list: "capitalize font-medium",
      }}
    >
      <BreadcrumbItem key={0} href="/">
        Home
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return (
          <BreadcrumbItem
            key={index + 1}
            href={href}
            className="max-w-64 [&>span]:!line-clamp-none [&>span]:!overflow-hidden [&>span]:!text-ellipsis"
          >
            {segment}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
