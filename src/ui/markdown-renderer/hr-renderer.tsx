import { cn } from "@/utils/cn";

export function hrRenderer(props: any) {
  return (
    <hr
      className={cn(
        "border-default-300 dark:border-default-100",
        props.className,
      )}
    />
  );
}
