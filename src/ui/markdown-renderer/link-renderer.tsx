import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";
import { Link as LuLink } from "lucide-react";

export function linkRenderer(props: any) {
  if ((props.node.properties.href as string).startsWith("#")) {
    return (
      <NextUILink
        href={props.href}
        as={Link}
        showAnchorIcon
        className="absolute -translate-x-6 translate-y-1/2"
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
    >
      {props.children}
    </NextUILink>
  );
}
