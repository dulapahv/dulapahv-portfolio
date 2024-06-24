import { cn } from "@/utils/cn";

export function theadRenderer(props: any) {
  return (
    <thead
      className={cn(
        "border-b-default-300 dark:border-b-default-100",
        props.className,
      )}
    >
      {props.children}
    </thead>
  );
}
