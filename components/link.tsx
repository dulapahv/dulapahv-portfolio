import type { ComponentProps } from 'react';
import NextLink from 'next/link';

type LinkProps = ComponentProps<'a'>;

export const Link = (props: LinkProps) =>
  props.href?.startsWith('/') || props.href?.startsWith('#') ? (
    <NextLink href={props.href} {...props} />
  ) : (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  );
