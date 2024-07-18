import './Calendar.css'

import React, {useState} from 'react';

import CalendarHeader from '../components/Calendar/CalendarHeader';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import YearCalendar from '../components/Calendar/YearCalendar';
import ToggleButton from '../components/Calendar/ToggleButton';

/*
end 날짜는 실제 날짜보다 하루 길게 잡아야함!
7/16-20 일정이라면, end는 2024-07-21
*/
const mockEvent = [
  { title: '시간 지정', start: '2024-07-18', end: '2024-07-18T19:00:00.000'},
  { title: '시간 미지정', start: '2024-07-19', end: '2024-07-18'},
  { title: '일정을 길게 잡으면 이렇게 나와용', start: '2024-07-16', end: '2024-07-20'},
];

const Calendar = () => {

  const [calendarType, setCalenderType] = useState('month');
  const changeCalenderType = (type) => {
    setCalenderType(type);
  }

  return (
    <div className="App">
      <CalendarHeader />
      <ToggleButton />
      {/* 테스트 코드 */}
      <div className='content'>
        <button type="button" onClick={() => changeCalenderType('month')}>month</button>
        <button type="button" onClick={() => changeCalenderType('year')}>year</button>

        {calendarType === 'month' ? <MonthCalendar mockEvent={mockEvent}/> : <YearCalendar />}
      </div>
    </div>
  );
}

export default Calendar;
