function formatDate(dateString) {
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
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

export function calculateArrivalDate(
  departureDate,
  departureTime,
  arrivalTime
) {
  const [depHour, depMinute] = departureTime.split(":").map(Number);
  const [arrHour, arrMinute] = arrivalTime.split(":").map(Number);

  const departureDateTime = new Date(departureDate);
  departureDateTime.setHours(depHour, depMinute, 0, 0);

  if (arrHour < depHour || (arrHour === depHour && arrMinute < depMinute)) {
    departureDateTime.setDate(departureDateTime.getDate() + 1);
  }

  const arrivalDate = departureDateTime.toISOString().slice(0, 10);
  const formattedArrivalDate = formatDate(arrivalDate);

  return formattedArrivalDate;
}
