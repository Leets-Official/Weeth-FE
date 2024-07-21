import React, {useState} from 'react';
import styled from 'styled-components';

import CalendarHeader from '../components/Calendar/CalendarHeader';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import YearCalendar from '../components/Calendar/YearCalendar';
import ToggleButton from '../components/Calendar/ToggleButton';

const StyledCalendar = styled.div`
  width: 370px;
  height: 800px;
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

const Calendar = () => {

  const [calendarType, setCalenderType] = useState('month');

  const onToggle = (isToggled) => {
    setCalenderType(isToggled ? 'year' : 'month');
  }

  return (
    <StyledCalendar>
      <CalendarHeader />
        <Content>
        <ToggleButton onToggle={onToggle} />
        {calendarType === 'month' ? <MonthCalendar mockEvent={mockEvent}/> : <YearCalendar />}
        {/* <button type="button" onClick={() => changeCalenderType('month')}>month</button>
        <button type="button" onClick={() => changeCalenderType('year')}>year</button> */}
      </Content>
    </StyledCalendar>
  );
}

export default Calendar;
