import { MONTH } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useGetYearlySchedule from '@/api/useGetYearlySchedule';
import YearlyCard from './YearlyCard';

const YearCalendar = ({ year }: { year: string }) => {
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024;

  const { data: yearlySchedule, error } = useGetYearlySchedule(year);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.MonthlyBox>
      <S.FirstHalfMonth>
        {MONTH.filter(
          (monthItem) => yearlySchedule && monthItem >= 1 && monthItem <= 6,
        ).map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      </S.FirstHalfMonth>
      <S.SecondHalfMonth>
        {MONTH.filter(
          (monthItem) => yearlySchedule && monthItem >= 7 && monthItem <= 12,
        ).map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={validYear}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      </S.SecondHalfMonth>
    </S.MonthlyBox>
  );
};

export default YearCalendar;
