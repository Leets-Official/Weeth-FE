import React from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100vw;
`;

const MonthCalendar = ({ mockEvent }) => {
  return (
    <CalendarContainer>
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
    </CalendarContainer>
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
