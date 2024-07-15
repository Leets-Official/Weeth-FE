import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Header from '../components/Header';

const mockEvent = [{ title: '중간 발표', date: '2024-07-18' }];

class Calendar extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={mockEvent}
          eventColor="grey"
          // locale={ koLocale }
          headerToolbar={false}
          fixedWeekCount={false}
        />
      </div>
    );
  }
}

export default Calendar;
