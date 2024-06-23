import { cn } from "@/utils/cn";

export function preRenderer(props: any) {
  return (
    <pre className={cn("not-prose", props.className)}>{props.children}</pre>
  );
}
