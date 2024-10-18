/* eslint-disable no-console */
import { useEffect, useRef, useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { MonthlyScheduleContext } from '@/service/MonthlyScheduleContext';
import MonthlyShceduleAPI from '@/service/MonthlyScheduleAPI';
import UserAPI from '@/service/UserAPI';
import * as S from '@/styles/calendar/MonthCalendar.styled';

interface MonthCalendarProps {
  year: number;
  month: number;
  editYear: (newYear: number) => void;
  editMonth: (newMonth: number) => void;
}


const MonthCalendar: React.FC<MonthCalendarProps> = ({ year, month }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const navi = useNavigate();

  const { monthScheduleData, error } = useContext(MonthlyScheduleContext);

  const prevMonth = month - 1;
  const nextMonth = month + 1;

  const [formattedStart, setFormattedStart] = useState(
    `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`,
  );
  const [formattedEnd, setFormattedEnd] = useState(
    new Date(year, nextMonth, 6, 23, 59, 59, 999).toISOString(),
  );

  useEffect(() => {
    if (error) {
      // console.error('Error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (!monthScheduleData) {
      // console.log('Loading event data...');
    }
  }, [monthScheduleData]);

  // 데이터 전처리 함수
  const preprocessData = (data: any) => {
    return data.map((event: any) => ({
      ...event,
      id: `${event.id}_${event.isMeeting}`, // 고유 ID 생성
    }));
  };

  const processedData = preprocessData(monthScheduleData || []);

  const renderDayCell = (arg: any) => {
    const isToday =
      format(arg.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    return (
      <div>
        {isToday && <S.Today>{arg.date.getDate()}</S.Today>}
        <div>{arg.date.getDate()}</div>
      </div>
    );
  };

  const onClickEvent = (clickInfo: any) => {
    const [id] = clickInfo.event.id.split('_'); // 원래 ID 추출
    const { isMeeting } = clickInfo.event.extendedProps;

    if (isMeeting) {
      navi(`/meetings/${id}`, { state: { isMeeting } });
    } else {
      navi(`/events/${id}`, { state: { isMeeting } });
    }
  };

  useEffect(() => {
    setFormattedStart(
      `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`,
    );
    setFormattedEnd(new Date(year, month, 7, 8, 59, 59, 999).toISOString());
  }, [year, month]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  return (
    <S.CalendarContainer>
      <UserAPI />
      <MonthlyShceduleAPI
        start={formattedStart}
        end={formattedEnd}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={processedData}
        eventClick={onClickEvent}
        locale="ko"
        headerToolbar={false}
        fixedWeekCount={false}
        dayCellContent={renderDayCell}
        height="auto"
      />
    </S.CalendarContainer>
  );
};

export default MonthCalendar;
