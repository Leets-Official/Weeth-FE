import React from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
  .fc {
    font-size: 12px;
  }

  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: #1f1f1f;
  }

  .fc-col-header-cell {
    background-color: #1f1f1f;
    padding-bottom: 15px;
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

  .fc-event,
  .fc-event-dot {
    padding: 3px 10px;
    background-color: #2f2f2f !important;
    border: none;
    border-radius: 20px;
  }

  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .fc-daygrid-event.fc-daygrid-block-event:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .fc-daygrid-event-dot {
    display: none;
  }

  .fc-event-time {
    display: none;
  }

  .fc-event-title {
    font-weight: 400;
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
