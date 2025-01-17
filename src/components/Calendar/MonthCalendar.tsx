import useGetMonthlySchedule from '@/api/useGetMonthSchedule';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import theme from '@/styles/theme';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WEEK_DAYS } from '@/constants/dateConstants';
import TodayIncluded from '@/hooks/TodayIncluded';
import ScheduleItem from './ScheduleItem';
import Line from '../common/Line';

const MonthCalendar = ({ year, month }: { year: number; month: number }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const navi = useNavigate();

  let formattedEnd;
  if (month === 12)
    formattedEnd = new Date(year + 1, 1, 1, 23, 59, 59, 999).toISOString();
  else
    formattedEnd = new Date(year, month + 1, 1, 23, 59, 59, 999).toISOString();

  const { data: monthlySchedule } = useGetMonthlySchedule(
    `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`,
    formattedEnd,
  );

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

  const renderEventContent = (eventInfo: any) => {
    const isTodayIncluded = TodayIncluded(
      eventInfo.event.start,
      eventInfo.event.end,
    );

    return (
      <div
        style={{
          color: isTodayIncluded ? theme.color.main : '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  const onClickEvent = (clickInfo: any) => {
    const [id] = clickInfo.event.id.split('_');
    const { isMeeting } = clickInfo.event.extendedProps;

    if (isMeeting) {
      navi(`/meetings/${id}`);
    } else {
      navi(`/events/${id}`);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  return (
    <S.Container>
      <S.Calendar>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          events={monthlySchedule}
          eventContent={renderEventContent}
          eventClick={onClickEvent}
          locale="ko"
          headerToolbar={false}
          fixedWeekCount={false}
          dayCellContent={renderDayCell}
          height="auto"
        />
      </S.Calendar>

      <Line width="100%" />

      <S.TodayDate>
        {format(new Date(), 'yyyy년 MM월 dd일')}{' '}
        <span>({WEEK_DAYS[new Date().getDay()]})</span>
      </S.TodayDate>
      <S.ScheduleList>
        {monthlySchedule.map((item) => (
          <ScheduleItem
            key={item.id}
            title={item.title}
            start={item.start}
            end={item.end}
          />
        ))}
      </S.ScheduleList>
    </S.Container>
  );
};

export default MonthCalendar;
