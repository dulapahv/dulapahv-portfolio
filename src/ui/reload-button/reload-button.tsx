"use client";

import { Button } from "@nextui-org/react";

export function ReloadButton() {
  return (
    <Button
      onPress={() => window.location.reload()}
      color="primary"
      radius="sm"
    >
      Reload
    </Button>
  );
}
