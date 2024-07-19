import React from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: #1f1f1f !important; /* 테두리 색상 변경 */
  }

  .fc-col-header-cell {
    background-color: #1f1f1f !important;
  }

  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .fc-day-sun a {
    color: #ff5858;
  }

  .fc-day-sat a {
    color: #508fff;
  }
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
        height="auto"
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
