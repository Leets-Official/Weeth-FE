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

  const onToggle = (isYear) => {
    setCalendarType(isYear ? 'year' : 'month');
    setIsYear(isYear);
  };

  return (
    <StyledCalendar>
      <CalendarHeader todayMonth={todayMonth} todayYear={todayYear} isYear={isYear} />
      <Content>
        <ToggleButton onToggle={onToggle} />
        {calendarType === 'month' ? <MonthCalendar /> : <YearCalendar todayMonth={todayMonth}/>}
      </Content>
    </StyledCalendar>
  );
};

export default Calendar;
