import './Calendar.css'

import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import CalendarHeader from '../components/CalendarHeader';

const mockEvent = [{ title: '중간 발표', date: '2024-07-18' }];

class Calendar extends Component {
  render() {
    return (
      <div className="App">
        <CalendarHeader />
        <FullCalendar
          className="calendar"
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={mockEvent}
          eventColor="grey"
          locale={ "koLocale" }
          headerToolbar={false}
          fixedWeekCount={false}
          dayCellContent={(arg) => arg.date.getDate()}
        />
      </div>
    );
  }
}

export default Calendar;
