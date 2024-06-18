"use client";

import { Button, Link } from "@nextui-org/react";

interface UrlButtonProps {
  url: string;
}

export function UrlButton({ url }: UrlButtonProps) {
  return (
    <Button
      href={url}
      as={Link}
      color="primary"
      radius="sm"
      showAnchorIcon
      isExternal
    >
      Go to Project
    </Button>
  );
}
