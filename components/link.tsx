import type { ComponentProps } from 'react';
import type { Route } from 'next';
import NextLink from 'next/link';

type LinkProps = ComponentProps<'a'>;

export function Link(props: LinkProps) {
  const href = props.href ?? '';

  // Pure in-page anchor
  if (href.startsWith('#')) return <a {...props} />;

  // Internal route: use Next.js client routing
  // @ts-expect-error href is a string
  if (href.startsWith('/')) return <NextLink href={href as Route} {...props} />;

  // External link
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}
