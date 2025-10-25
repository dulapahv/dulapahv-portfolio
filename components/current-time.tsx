import Link from 'next/link';

import { cn } from '@/lib/utils';

function getTime() {
  const now = new Date();
  const edinburghTimeString = now.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const edinburghHour = Number(
    now.toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      hour12: false,
    }),
  );

  let emoji = '🕰️';
  if (edinburghHour >= 5 && edinburghHour <= 7) emoji = '🌅';
  else if (edinburghHour >= 8 && edinburghHour <= 11) emoji = '☀️';
  else if (edinburghHour >= 12 && edinburghHour <= 17) emoji = '🌤️';
  else if (edinburghHour >= 18 && edinburghHour <= 20) emoji = '🌇';
  else emoji = '🌙';

  return `${emoji} ${edinburghTimeString}`;
}

export default async function CurrentTime() {
  const time = getTime();

  return (
    <Link
      href="https://www.timeanddate.com/time/zone/uk"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Current time in Edinburgh: ${time}`}
      className={cn(
        `border-border bg-background text-foreground-muted inline-flex rounded-md border
        p-1 pr-1.5 align-middle text-base font-medium transition-colors`,
        'hover:bg-background-subtle hover:border-border-strong',
      )}
      suppressHydrationWarning
    >
      {time}
    </Link>
  );
}
