"use client";

import { Button } from "@nextui-org/react";

const ReloadButton = () => {
  return (
    <Button
      onPress={() => window.location.reload()}
      color="primary"
      radius="sm"
    >
      Reload
    </Button>
  );
};

export default ReloadButton;
