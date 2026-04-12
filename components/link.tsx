import type { Route } from "next";
import NextLink from "next/link";
import type { ComponentProps } from "react";

type NextLinkProps = ComponentProps<typeof NextLink>;
type AnchorProps = ComponentProps<"a">;

type LinkProps = Omit<AnchorProps, "href"> & {
  href: string;
  prefetch?: NextLinkProps["prefetch"];
  scroll?: NextLinkProps["scroll"];
  replace?: NextLinkProps["replace"];
};

const isProtocolLink = (href: string): boolean =>
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("sms:");

const isExternalLink = (href: string): boolean =>
  href.startsWith("http://") || href.startsWith("https://");

export function Link({ href, prefetch, scroll, replace, ...rest }: LinkProps) {
  // In-page anchor
  if (href.startsWith("#")) {
    return <a href={href} {...rest} />;
  }

  // mailto:, tel:, sms
  if (isProtocolLink(href)) {
    return <a href={href} {...rest} />;
  }

  // External http(s) URL
  if (isExternalLink(href)) {
    return <a href={href} rel="noopener" target="_blank" {...rest} />;
  }

  // Internal route
  return (
    <NextLink
      href={href as Route}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      {...rest}
    />
  );
}
