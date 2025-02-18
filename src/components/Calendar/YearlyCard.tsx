import icDot from '@/assets/images/ic_dot.svg';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.font.regular};
  font-size: 16px;
`;

export const ContentWrapper = styled.div`
  background-color: ${theme.color.gray[18]};
  padding: 10px;
  margin-bottom: 15px;
  width: 324px;
  border-radius: 10px;
  font-size: 14px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

export const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

export const MonthName = styled.div<{ $isToday: boolean }>`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.$isToday === true ? '#00dda8' : '#ffffff')};
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
}

const EventComponent = ({ title }: { title: string }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </Content>
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
  let isToday;

  if (thisMonth === 1 || thisMonth === 2) {
    isToday = CURRENT_MONTH === thisMonth && CURRENT_YEAR - 1 === year;
  } else {
    isToday = CURRENT_MONTH === thisMonth && CURRENT_YEAR === year;
  }
  return (
    <StyledYear>
      <MonthName $isToday={isToday}>{thisMonth}월</MonthName>
      <ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} title={event.title} />
          ))
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </ContentWrapper>
    </StyledYear>
  );
};

export default YearlyCard;
