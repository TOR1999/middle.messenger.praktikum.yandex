export const getDateTimeFromStr = (data: string) => {
  const [date, time] = data.split("T");

  return `${date}\n${time.slice(0, 5)}`;
};
