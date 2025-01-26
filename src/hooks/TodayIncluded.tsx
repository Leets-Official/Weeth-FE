const stripTime = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const TodayIncluded = (start: string, end: string): boolean => {
  const today = stripTime(new Date());
  const eventStart = stripTime(new Date(start));
  const eventEnd = stripTime(new Date(end));

  return today >= eventStart && today <= eventEnd;
};

export default TodayIncluded;
