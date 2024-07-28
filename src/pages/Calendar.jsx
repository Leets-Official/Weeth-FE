import React, { useState } from 'react';
import styled from 'styled-components';

import CalendarHeader from '../components/Calendar/CalendarHeader';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import YearCalendar from '../components/Calendar/YearCalendar';
import ToggleButton from '../components/Calendar/ToggleButton';

const StyledCalendar = styled.div`
  width: 370px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const Calendar = () => {
  const [calendarType, setCalendarType] = useState('month');
  const [isYear, setIsYear] = useState(false);
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);

  const onToggle = (isYear) => {
    setCalendarType(isYear ? 'year' : 'month');
    setIsYear(isYear);
  };

  const editYear = (newYear) => {
    setYear(newYear);
  };

  const editMonth = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <StyledCalendar>
      <CalendarHeader month={month} year={year} isYear={isYear} editYear={editYear} editMonth={editMonth} />
      <Content>
        <ToggleButton onToggle={onToggle} />
        {calendarType === 'month' ? <MonthCalendar month={month} year={year} editYear={editYear} editMonth={editMonth} /> : <YearCalendar year={year} month={month}/>}
      </Content>
    </StyledCalendar>
  );
};

export default Calendar;
