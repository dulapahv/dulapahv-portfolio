'use server';

export async function getTime() {
  const now = new Date();

  // Convert to Edinburgh (Europe/London) time
  const edinburghTimeString = now.toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Extract hour
  const edinburghHour = Number(
    now.toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      hour12: false,
    }),
  );

  // Determine emoji
  let emoji = '🕰️';
  if (edinburghHour >= 5 && edinburghHour <= 7) emoji = '🌅';
  else if (edinburghHour >= 8 && edinburghHour <= 11) emoji = '☀️';
  else if (edinburghHour >= 12 && edinburghHour <= 17) emoji = '🌤️';
  else if (edinburghHour >= 18 && edinburghHour <= 20) emoji = '🌇';
  else emoji = '🌙';

  return `${emoji} ${edinburghTimeString}`;
}
