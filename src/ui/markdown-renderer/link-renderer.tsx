import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";

export function linkRenderer(props: any) {
  return (
    <NextUILink
      href={props.href}
      as={Link}
      underline="hover"
      isExternal
      showAnchorIcon
    >
      {props.children}
    </NextUILink>
  );
}
