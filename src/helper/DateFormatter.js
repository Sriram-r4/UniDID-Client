function formatDate(dateString) {
  const months = [
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

  const [, month, day] = dateString.split("-");
  const shortMonth = months[parseInt(month, 10) - 1];

  return `${shortMonth}-${day}`;
}

export default formatDate;
