import { FALL_SEMESTER, SPRING_SEMESTER } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useGetYearlySchedule from '@/api/useGetYearlySchedule';
import YearlyCard from './YearlyCard';

const YearCalendar = ({ year, term }: { year: number; term: number }) => {
  const { data: yearlySchedule, error } = useGetYearlySchedule({
    year,
    semester: term,
  });

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
            year={year}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      {term === 2 &&
        FALL_SEMESTER.map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={year}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
    </S.MonthlyBox>
  );
};

export default YearCalendar;
