import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";
import { Link as LuLink } from "lucide-react";

import { cn } from "@/utils/cn";

export function aRenderer(props: any) {
  if ((props.node.properties.href as string).startsWith("#")) {
    return (
      <NextUILink
        href={props.href}
        as={Link}
        showAnchorIcon
        className="mr-2 align-middle sm:absolute sm:-translate-x-6 sm:translate-y-1/2"
        anchorIcon={<LuLink size={16} />}
      >
        {props.children}
      </NextUILink>
    );
  }
  return (
    <NextUILink
      href={props.href}
      as={Link}
      underline="hover"
      isExternal
      showAnchorIcon
      className={cn("no-underline", props.className)}
    >
      {props.children}
    </NextUILink>
  );
}
