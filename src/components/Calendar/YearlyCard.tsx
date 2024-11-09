/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import icDot from '@/assets/images/ic_dot.svg';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/MonthlyEvent.styled';

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
}

const EventComponent = ({ title }: { title: string }) => {
  return (
    <S.Content>
      <S.Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </S.Content>
  );
};

const YearlyCard = ({
  thisMonth,
  year,
  events,
}: {
  thisMonth: number;
  year: string | number;
  events: Event[];
}) => {
  const isToday = CURRENT_MONTH === thisMonth && CURRENT_YEAR === year;

  return (
    <S.StyledYear>
      <S.MonthName $isToday={isToday}>{thisMonth}월</S.MonthName>
      <S.ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} title={event.title} />
          ))
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </S.ContentWrapper>
    </S.StyledYear>
  );
};

export default YearlyCard;
