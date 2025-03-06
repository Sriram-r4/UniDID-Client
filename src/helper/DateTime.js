function dateTime(timestamp) {
  const dateObj = new Date(timestamp);

  const date = dateObj.toLocaleDateString("en-IN");
  const time = dateObj.toLocaleTimeString("en-IN");
  return [date, time];
}

export default dateTime;
