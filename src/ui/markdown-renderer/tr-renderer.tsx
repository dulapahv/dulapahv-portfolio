import { twMerge } from "tailwind-merge";

export function trRenderer(props: any) {
  return (
    <tr className={twMerge("border-b-default-100", props.className)}>
      {props.children}
    </tr>
  );
}
