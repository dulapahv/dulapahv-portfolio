const formatDate = (date: Date | null): string => {
  if (!date) return "Present";

  if (isNaN(date.getTime())) throw new Error("Invalid ISO8601 date string");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString();

  return `${month} ${year}`;
};

export default formatDate;
