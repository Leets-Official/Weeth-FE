import { useState } from 'react';

import CalendarHeader from '@/components/Calendar/CalendarHeader';
import MonthCalendar from '@/components/Calendar/MonthCalendar';
import ToggleButton from '@/components/Calendar/ToggleButton';
import YearCalendar from '@/components/Calendar/YearCalendar';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useCustomBack from '@/router/useCustomBack';
import YearlyScheduleAPI from '@/service/YearlyScheduleAPI';

import * as S from '@/styles/calendar/Calendar.styled';

const Calendar = () => {
  useCustomBack('/home');
  const [isMonth, setIsMonth] = useState(true);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);

  // TODO: 백엔드 수정 후 삭제 예정
  const start = `${year}-01-01T00:00:00.000Z`;
  const end = `${year}-12-31T23:59:59.999Z`;

  const onToggle = () => {
    setIsMonth(!isMonth);
  };

  return (
    <S.CalendarWrapper>
      <YearlyScheduleAPI start={start} end={end} />
      <CalendarHeader
        month={month}
        year={year}
        isMonth={isMonth}
        editYear={(newYear: number) => setYear(newYear)}
        editMonth={(newMonth: number) => setMonth(newMonth)}
      />
      <S.Content>
        <ToggleButton isMonth={isMonth} onToggle={onToggle} />
        {isMonth ? (
          <MonthCalendar month={month} year={year} />
        ) : (
          <YearCalendar year={year.toString()} />
        )}
      </S.Content>
    </S.CalendarWrapper>
  );
};

export default Calendar;
