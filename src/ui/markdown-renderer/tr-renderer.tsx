import { cn } from '@/utils/cn';

export function trRenderer(props: any) {
  return (
    <tr
      className={cn(
        'border-b-default-300 dark:border-b-default-100',
        props.className,
      )}
    >
      {props.children}
    </tr>
  );
}
