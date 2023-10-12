export const daysBetweenDates = (initialDate: Date, finalDate: Date) => {
  const difference = finalDate.getTime() - initialDate.getTime();
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return TotalDays;
};
