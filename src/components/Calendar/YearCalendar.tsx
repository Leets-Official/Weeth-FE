import * as S from '@/styles/calendar/YearCalendar.styled';
import React, { useContext } from 'react';

import MonthlyEvent from '@/components/Calendar/MonthlyEvent';
import { YearlyScheduleContext } from '@/api/hook/router/YearlyScheduleContext';

interface YearCalendarProps {
  year: string;
}

const allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearCalendar: React.FC<YearCalendarProps> = ({ year }) => {
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
        {allMonth
          .filter((monthItem) => monthItem >= 1 && monthItem <= 6)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
              events={yearScheduleData[monthItem] || []}
            />
          ))}
      </S.FirstHalfMonth>
      <S.SecondHalfMonth>
        {allMonth
          .filter((monthItem) => monthItem >= 7 && monthItem <= 12)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
              events={yearScheduleData[monthItem] || []}
            />
          ))}
      </S.SecondHalfMonth>
    </S.MonthlyBox>
  );
};

export default YearCalendar;
