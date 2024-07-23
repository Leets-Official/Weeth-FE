import React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { format } from 'date-fns';

import theme from '../../styles/theme';
import mockEventMonth from '../mockData/mockEventMonth';

const CalendarContainer = styled.div`
  width: 100%;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  z-index: 2;

  .fc {
    font-size: 12px;
  }

  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${theme.color.grayScale.gray12};
  }

  .fc-col-header-cell {
    background-color: ${theme.color.grayScale.gray12};
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
    color: ${theme.color.main.negative};
  }

  .fc-day-sat a {
    color: ${theme.color.main.pointBlue};
  }

  .fc-event,
  .fc-event-dot {
    padding: 3px 10px;
    background-color: ${theme.color.grayScale.gray18}; !important;
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

const Today = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  right: 7px;
  background: ${theme.color.main.mainColor};
  border-radius: 10px;
  width: 38px;
  height: 22px;
  z-index: 0;
`;

const MonthCalendar = () => {
  const renderDayCell = (arg) => {
    const isToday =
      format(arg.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    return (
      <div>
        {isToday && <Today>{arg.date.getDate()}</Today>}
        <div>{arg.date.getDate()}</div>
      </div>
    );
  };

  return (
    <CalendarContainer>
      <FullCalendar
        className="calendar"
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={mockEventMonth}
        locale="koLocale"
        headerToolbar={false}
        fixedWeekCount={false}
        dayCellContent={renderDayCell}
        height="auto"
      />
    </CalendarContainer>
  );
};

export default MonthCalendar;
