import { twMerge } from "tailwind-merge";

export function preRenderer(props: any) {
  return (
    <pre className={twMerge("not-prose", props.className)}>
      {props.children}
    </pre>
  );
}
