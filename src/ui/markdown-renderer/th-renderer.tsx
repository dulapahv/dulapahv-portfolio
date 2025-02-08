import { cn } from '@/utils/cn';

export function thRenderer(props: any) {
  return <th className={cn('text-left', props.className)}>{props.children}</th>;
}
