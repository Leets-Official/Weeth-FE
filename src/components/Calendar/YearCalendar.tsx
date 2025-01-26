import { FALL_SEMESTER, SPRING_SEMESTER } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useGetYearlySchedule from '@/api/useGetYearlySchedule';
import YearlyCard from './YearlyCard';

const YearCalendar = ({ year, term }: { year: string; term: number }) => {
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024;

  const { data: yearlySchedule, error } = useGetYearlySchedule(year);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.MonthlyBox>
      {term === 1 &&
        SPRING_SEMESTER.map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      {term === 2 &&
        FALL_SEMESTER.map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
    </S.MonthlyBox>
  );
};

export default YearCalendar;
