function reverseDate(dateStr) {
  const parts = dateStr.split("-");
  return [parts[2], parts[1], parts[0]].join("-");
}

export default reverseDate;
