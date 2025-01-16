const TodayPassed = (end: string): boolean => {
  const today = new Date();
  const eventEnd = new Date(end);

  return today >= eventEnd;
};

export default TodayPassed;
