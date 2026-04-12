/**
 * Date formatting helpers. All formatters use the en-US locale to keep
 * server-rendered output stable regardless of the request locale.
 */

const LOCALE = "en-US" as const;

/** "January 5, 2024" */
export const formatLongDate = (date: Date): string =>
  date.toLocaleDateString(LOCALE, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/** "Jan 5, 2024" */
export const formatShortDate = (date: Date): string =>
  date.toLocaleDateString(LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** "Jan 2024" */
export const formatMonthYear = (date: Date): string =>
  date.toLocaleDateString(LOCALE, {
    month: "short",
    year: "numeric",
  });

/** "Jan" */
export const formatMonth = (date: Date): string =>
  date.toLocaleDateString(LOCALE, { month: "short" });

/** "2024-01-05" — for `<time dateTime="">` and structured-data fields. */
export const toISODate = (date: Date): string =>
  date.toISOString().split("T")[0];

/** "2024-01-05/2024-06-30" or "2024-01-05" if no end date. */
export const formatISODateRange = (startDate: Date, endDate?: Date): string => {
  const start = toISODate(startDate);
  return endDate ? `${start}/${toISODate(endDate)}` : start;
};
