import { useState } from 'react';
import CalendarHeader from '@/components/Calendar/CalendarHeader';
import MonthCalendar from '@/components/Calendar/MonthCalendar';
import ToggleButton from '@/components/Calendar/ToggleButton';
import YearCalendar from '@/components/Calendar/YearCalendar';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/calendar/Calendar.styled';

const Calendar = () => {
  useCustomBack('/home');
  const [isMonth, setIsMonth] = useState(true);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [month, setMonth] = useState(CURRENT_MONTH);

  const onToggle = () => {
    setIsMonth(!isMonth);
  };

  return (
    <S.CalendarWrapper>
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
