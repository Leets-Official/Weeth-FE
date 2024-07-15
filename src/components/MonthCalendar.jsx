import React from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MonthCalendar = ({ mockEvent }) => {
  return (
    <div>
      <FullCalendar
        className="calendar"
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={mockEvent}
        eventColor="grey"
        locale="koLocale"
        headerToolbar={false}
        fixedWeekCount={false}
        dayCellContent={(arg) => arg.date.getDate()}
      />
    </div>
  );
};

MonthCalendar.propTypes = {
  mockEvent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MonthCalendar;
