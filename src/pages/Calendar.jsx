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

const mockEvent = [
  { title: '일정', start: '2024-07-18T19:00:00.000', end: '2024-07-18T19:00:00.000'},
  { title: '일정을 길게 잡으면', start: '2024-07-16T19:00:00.000', end: '2024-07-19T19:00:00.000'},
  { title: '몇주에 걸친 일정', start: '2024-06-30T19:00:00.000', end: '2024-08-01T19:00:00.000'},
];

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const Calendar = () => {
  const [calendarType, setCalendarType] = useState('month');
  const [isMonth, setIsMonth] = useState(true);

  const onToggle = (isMonth) => {
    setCalendarType(isMonth ? 'year' : 'month');
    setIsMonth(isMonth);
  };

  return (
    <StyledCalendar>
      <CalendarHeader todayMonth={todayMonth} todayYear={todayYear} isMonth={isMonth} />
      <Content>
        <ToggleButton onToggle={onToggle} />
        {calendarType === 'month' ? <MonthCalendar mockEvent={mockEvent}/> : <YearCalendar todayMonth={todayMonth}/>}
      </Content>
    </StyledCalendar>
  );
};

export default Calendar;
