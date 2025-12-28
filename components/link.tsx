import type { Route } from "next";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<"a">;

export function Link(props: LinkProps) {
  const href = props.href ?? "";

  // Pure in-page anchor
  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  // Internal route: use Next.js client routing
  // @ts-expect-error href is a string
  if (href.startsWith("/")) {
    return <NextLink href={href as Route} {...props} />;
  }

  // External link
  return <a {...props} rel="noopener noreferrer" target="_blank" />;
}
