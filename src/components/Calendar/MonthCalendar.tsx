/* eslint-disable no-console */
import getMonthlySchedule from '@/api/getMonthSchedule';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MonthCalendar = ({ year, month }: { year: number; month: number }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const navi = useNavigate();

  const prevMonth = month - 1;
  const nextMonth = month + 1;

  const [monthlySchedule, setMontlySchedule] = useState();
  const [formattedStart, setFormattedStart] = useState(
    `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`,
  );
  const [formattedEnd, setFormattedEnd] = useState(
    new Date(year, nextMonth, 6, 23, 59, 59, 999).toISOString(),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (formattedStart && formattedEnd) {
          const response = await getMonthlySchedule(
            formattedStart,
            formattedEnd,
          );
          if (response.data.code === 200) {
            setMontlySchedule(response.data.data);
          } else {
            console.error(response.data.message);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [formattedStart]);

  // 데이터 전처리 함수
  // TODO: 백엔드 수정 후 삭제 예정
  const preprocessData = (data: any) => {
    return data.map((event: any) => ({
      ...event,
      id: `${event.id}_${event.isMeeting}`,
    }));
  };

  const processedData = preprocessData(monthlySchedule || []);

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
