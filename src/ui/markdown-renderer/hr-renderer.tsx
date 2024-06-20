import { twMerge } from "tailwind-merge";

export function hrRenderer(props: any) {
  return <hr className={twMerge("border-default-100", props.className)} />;
}
