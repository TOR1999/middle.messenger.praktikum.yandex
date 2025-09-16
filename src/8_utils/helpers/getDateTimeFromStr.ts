export const getDateTimeFromStr = (data: string) => {
  if (!data) return "";

  const [date, time] = data.split("T");

  return `${date}\n${time.slice(0, 5)}`;
};
