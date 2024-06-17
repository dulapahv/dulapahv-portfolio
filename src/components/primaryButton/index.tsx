"use client";

import React, { ReactNode } from "react";
import { Button } from "@nextui-org/react";

interface PrimaryButtonProps {
  children?: ReactNode;
  onPress?: () => void;
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProps) => {
  return (
    <Button onPress={() => onPress && onPress()} color="primary" radius="sm">
      {children}
    </Button>
  );
};

export default PrimaryButton;
