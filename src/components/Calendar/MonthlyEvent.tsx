/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import icDot from '@/assets/images/ic_dot.svg';
import * as S from '@/styles/calendar/MonthlyEvent.styled';
import React from 'react';

interface EventComponentProps {
  title: string;
}

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
}

interface MonthlyEventProps {
  thisMonth: number;
  year: string | number;
  events: Event[];
}

const EventComponent: React.FC<EventComponentProps> = ({ title }) => {
  return (
    <S.Content>
      <S.Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </S.Content>
  );
};

const MonthlyEvent: React.FC<MonthlyEventProps> = ({
  thisMonth,
  year,
  events,
}) => {
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const istoday = thisMonth === todayMonth && todayYear === year;

  return (
    <S.StyledYear>
      <S.MonthName $isToday={istoday}>{thisMonth}월</S.MonthName>
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

export default MonthlyEvent;
