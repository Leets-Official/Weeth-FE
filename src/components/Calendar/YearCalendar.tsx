import * as S from '@/styles/calendar/YearCalendar.styled';
import { useContext } from 'react';

import { MONTH } from '@/constants/dateConstants';
import { YearlyScheduleContext } from '@/api/YearlyScheduleContext';
import YearlyCard from './YearlyCard';

const YearCalendar = ({ year }: { year: string }) => {
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024;
  const { yearScheduleData, error } = useContext(YearlyScheduleContext);

  if (error) {
    return <S.Error>데이터를 불러오는 중 문제가 발생했습니다</S.Error>;
  }

  if (!yearScheduleData) {
    return <S.Error>Loading...</S.Error>;
  }

  return (
    <S.MonthlyBox>
      <S.FirstHalfMonth>
        {MONTH.filter((monthItem) => monthItem >= 1 && monthItem <= 6).map(
          (monthItem) => (
            <YearlyCard
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
              events={yearScheduleData[monthItem] || []}
            />
          ),
        )}
      </S.FirstHalfMonth>
      <S.SecondHalfMonth>
        {MONTH.filter((monthItem) => monthItem >= 7 && monthItem <= 12).map(
          (monthItem) => (
            <YearlyCard
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
              events={yearScheduleData[monthItem] || []}
            />
          ),
        )}
      </S.SecondHalfMonth>
    </S.MonthlyBox>
  );
};

export default YearCalendar;
