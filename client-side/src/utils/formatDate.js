export function formatDate(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date?.getDay()];
  const dayOfMonth = date?.getDate();
  const month = monthsOfYear[date?.getMonth()];
  const year = date?.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}
