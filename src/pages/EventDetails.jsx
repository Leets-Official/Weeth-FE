import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import icCalendar from '../assets/images/ic_date.svg';
import icClock from '../assets/images/ic_clock.svg';
import theme from '../styles/theme';
import BoardTitle from '../components/BoardTitle';
import mockEventMonth from '../components/mockData/mockEventMonth';

const StyledEventDetails = styled.div`
  width: 370px;
  // 해당페이지는 컴포넌트화될 예정이므로 따로 추가하지 않음
  // 추후에 만들어질 컴포넌트에서 설정하겟습니당
`;

const ContentBlock = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  padding-right: 5px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30};
  margin: 10px;
  transform: scaleY(0.2);
`;

const EventDetails = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-shadow, radix
  const event = mockEventMonth.find((event) => event.id === parseInt(id));

  const origStartDate = event.start;
  const origEndDate = event.end;

  const splittedStartDate = origStartDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const startDate = splittedStartDate[0].split('-'); // [YYYY, MM, DD]
  const startTime = splittedStartDate[1].split(':'); // [HH, MM]

  const splittedEndDate = origEndDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const endDate = splittedEndDate[0].split('-'); // [YYYY, MM, DD]
  const endTime = splittedEndDate[1].split(':'); // [HH, MM]

  let isOneday = true;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < startDate.length; i++) {
    if (startDate[i] !== endDate[i]) {
      isOneday = false;
    }
  }

  return (
    <StyledEventDetails>
      {event.id} {event.title}
      <BoardTitle text={event.title} writter={event.userName} />
      <Line />
      <ContentBlock>
        {isOneday ? (
          // 하루 일정일 때
          <>
            <TimeInfo>
              <Icon src={icCalendar} alt="calenar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일
              </div>
            </TimeInfo>
            <TimeInfo>
              <Icon src={icClock} alt="clock" />
              <div>
                {startTime[0]}:{startTime[1]} ~ {endTime[0]}:{endTime[1]}
              </div>
            </TimeInfo>
          </>
        ) : (
          // 긴 일정일 때
          <>
            <TimeInfo>
              <Icon src={icCalendar} alt="calenar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일 {startTime[0]}:{startTime[1]}에서
              </div>
            </TimeInfo>
            <TimeInfo>
              <Icon src={icClock} alt="clock" />
              <div>
                {endDate[0]}년 {endDate[1]}월 {endDate[2]}일 {endTime[0]}:
                {endTime[1]}까지
              </div>
            </TimeInfo>
          </>
        )}
      </ContentBlock>
      <ContentBlock>
        <div>장소 : {event.location} </div>
        <div>준비물 : {event.requiredItems} </div>
        <div>총 인원 : {event.memberNumber}</div>
      </ContentBlock>
      <ContentBlock>
        <div>{event.content}</div>
      </ContentBlock>
    </StyledEventDetails>
  );
};

export default EventDetails;
