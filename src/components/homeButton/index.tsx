"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const HomeButton = () => {
  const router = useRouter();

  return (
    <Button onPress={() => router.push("/")} color="primary" radius="sm">
      Return Home
    </Button>
  );
};

export default HomeButton;
