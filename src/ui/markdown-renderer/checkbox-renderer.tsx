import { Checkbox } from "@nextui-org/react";

import { cn } from "@/utils/cn";

export function checkboxRenderer(props: any) {
  return (
    <Checkbox
      isSelected={props.checked}
      className={cn(props.disabled && "pointer-events-none")}
      radius="sm"
      color="primary"
    >
      {props.children}
    </Checkbox>
  );
}
