/* eslint-disable no-console */
import MonthlyShceduleAPI from '@/api/MonthlyScheduleAPI';
import { MonthlyScheduleContext } from '@/api/MonthlyScheduleContext';
import UserAPI from '@/api/UserAPI';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: any 타입 수정
const MonthCalendar = ({ year, month }: { year: number; month: number }) => {
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
      // TODO: 에러처리 로직 추가
    }
  }, [error]);

  // 데이터 전처리 함수
  // TODO: 백엔드 수정 후 삭제 예정
  const preprocessData = (data: any) => {
    return data.map((event: any) => ({
      ...event,
      id: `${event.id}_${event.isMeeting}`,
    }));
  };

  const processedData = preprocessData(monthScheduleData || []);

  // 오늘 표시
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
    <S.Calendar>
      <UserAPI />
      <MonthlyShceduleAPI start={formattedStart} end={formattedEnd} />
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
    </S.Calendar>
  );
};

export default MonthCalendar;
