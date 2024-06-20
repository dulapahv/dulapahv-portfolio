import { Checkbox } from "@nextui-org/react";

export function checkboxRenderer(props: any) {
  return (
    <Checkbox
      isSelected={props.checked}
      className={props.disabled ? "pointer-events-none" : ""}
      radius="sm"
      color="primary"
    >
      {props.children}
    </Checkbox>
  );
}
