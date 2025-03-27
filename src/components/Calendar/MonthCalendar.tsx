import useGetMonthlySchedule, {
  getMonthlySchedule,
} from '@/api/useGetMonthSchedule';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import theme from '@/styles/theme';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
  WEEK_DAYS,
} from '@/constants/dateConstants';
import TodayIncluded from '@/hooks/TodayIncluded';
import ScheduleItem from '@/components/Calendar/ScheduleItem';
import Line from '@/components/common/Line';
import dayjs from 'dayjs';
import { toastError } from '../common/ToastMessage';
// import Loading from '../common/Loading';

const MonthCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [searchParams] = useSearchParams();

  const year = Number(searchParams.get('year')) || CURRENT_YEAR;
  const month = Number(searchParams.get('month')) || CURRENT_MONTH;

  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [selectedEventList, setSelectedEventList] = useState<any>([]);

  let formattedEnd;
  if (month === 12)
    formattedEnd = new Date(year + 1, 1, 1, 23, 59, 59, 999).toISOString();
  else
    formattedEnd = new Date(year, month + 1, 1, 23, 59, 59, 999).toISOString();

  const { monthlySchedule } = useGetMonthlySchedule(
    `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`,
    formattedEnd,
  );

  useEffect(() => {
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();

    const fetchData = async () => {
      try {
        const response = await getMonthlySchedule(
          `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T00:00:00.000Z`,
          `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T23:59:59.999Z`,
        );
        setSelectedEventList(
          Array.isArray(response.data.data) ? response.data.data : [],
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        toastError('데이터를 불러오지 못했습니다.');
        setSelectedEventList([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  const renderDayCell = (arg: any) => {
    const isToday =
      format(arg.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    const isSelected =
      format(arg.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    return (
      <div>
        {isSelected && (
          <S.SelectedDateOnCalendar>
            {arg.date.getDate()}
          </S.SelectedDateOnCalendar>
        )}
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
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <S.Bar isMeeting={eventInfo.event.extendedProps?.isMeeting} />
        <div
          style={{
            color: isTodayIncluded ? theme.color.main : '#fff',
            overflow: 'hidden',
            width: '42px',
          }}
        >
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  const onDateSelect = (selectInfo: any) => {
    const { start } = selectInfo;
    setSelectedDate(start);
  };

  const onDateClick = (clickInfo: any) => {
    setSelectedDate(clickInfo.event.start);
  };

  // if (loading) return <Loading />;

  return (
    <S.Container>
      <S.Calendar>
        <FullCalendar
          ref={calendarRef}
          selectable
          select={onDateSelect}
          longPressDelay={50}
          plugins={[dayGridPlugin, interactionPlugin]}
          events={monthlySchedule}
          eventContent={renderEventContent}
          eventClick={onDateClick}
          dayMaxEvents={3}
          moreLinkClick="none"
          locale="ko"
          headerToolbar={false}
          fixedWeekCount={false}
          dayCellContent={renderDayCell}
          height="auto"
        />
      </S.Calendar>

      <Line width="100%" />

      <S.SelectedDate>
        {format(new Date(selectedDate), 'yyyy년 MM월 dd일')}{' '}
        <span>({WEEK_DAYS[dayjs(selectedDate).day()]})</span>
      </S.SelectedDate>

      {selectedEventList.length > 0 ? (
        <S.ScheduleList>
          {selectedEventList.map((item: any) => (
            <ScheduleItem
              key={item.id}
              id={item.id}
              title={item.title}
              start={item.start}
              end={item.end}
              isMeeting={item.isMeeting}
              year={year}
              month={month}
            />
          ))}
        </S.ScheduleList>
      ) : (
        <S.ScheduleList>
          <S.NoEvent>일정이 없습니다!</S.NoEvent>
        </S.ScheduleList>
      )}
    </S.Container>
  );
};

export default MonthCalendar;
