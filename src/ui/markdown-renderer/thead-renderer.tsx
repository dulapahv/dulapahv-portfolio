import { twMerge } from "tailwind-merge";

export function theadRenderer(props: any) {
  return (
    <thead className={twMerge("border-b-default-100", props.className)}>
      {props.children}
    </thead>
  );
}
