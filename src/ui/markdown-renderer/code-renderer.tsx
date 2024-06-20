import { twMerge } from "tailwind-merge";

export function codeRenderer(props: any) {
  if (props.className?.includes("hljs")) {
    return <code className={props.className}>{props.children}</code>;
  }

  return (
    <code className={twMerge(props.className)}>{props.children}</code>
  );
}
