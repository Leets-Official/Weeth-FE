import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import MonthlyEvent from '@/components/Calendar/MonthlyEvent';
import { YearlyScheduleContext } from '@/service/YearlyScheduleContext';

interface YearCalendarProps {
  year: string;
}

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 370px;
  padding-bottom: 183px;
`;

const FirstHalfMonth = styled.div`
  padding-left: 15px;
`;

const SecondHalfMonth = styled.div`
  padding-right: 15px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearCalendar: React.FC<YearCalendarProps> = ({ year }) => {
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024;
  const { yearScheduleData, error } = useContext(YearlyScheduleContext);

  if (error) {
    return <Error>데이터를 불러오는 중 문제가 발생했습니다</Error>;
  }

  if (!yearScheduleData) {
    return <Error>Loading...</Error>;
  }

  return (
    <MonthlyBox>
      <FirstHalfMonth>
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
      </FirstHalfMonth>
      <SecondHalfMonth>
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
      </SecondHalfMonth>
    </MonthlyBox>
  );
};

export default YearCalendar;
