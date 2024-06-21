import { twMerge } from "tailwind-merge";

export function thRenderer(props: any) {
  return (
    <th className={twMerge("text-left", props.className)}>{props.children}</th>
  );
}
