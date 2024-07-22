import React from 'react';
import styled from 'styled-components';
import BoardTitle from '../components/BoardTitle';

import icCalendar from '../assets/images/date.svg';
import icClock from '../assets/images/clock.svg';

const StyledEventDetails = styled.div`
  width: 370px;
`;

const ContentBlock = styled.div`
  background-color: #2e2e2e;
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
  color: #4d4d4d;
  margin: 10px;
  transform: scaleY(0.2);
`;

const EventDetails = () => {
  return (
    <StyledEventDetails>
      <BoardTitle />
      <Line />
      <ContentBlock>
        <TimeInfo>
          <Icon src={icCalendar} alt="calenar" />
          <div>2024년 7월 18일 목요일</div>
        </TimeInfo>
        <TimeInfo>
          <Icon src={icClock} alt="clock" />
          <div>19:00 ~ 21:00</div>
        </TimeInfo>
      </ContentBlock>
      <ContentBlock>
        <div>
          장소 : 가천관 712호
          <br />
          준비물 : 개인 노트북, 발표 자료
          <br /> 총 인원 : 모든 인원
        </div>
      </ContentBlock>
      <ContentBlock>
        <div>
          3기가 진행하는 프로젝트를 중간 상황 보고를 목적으로 발표하는 날입니다.
          <br />
          발표자료는 당일 18일 18시까지 자료 게시판에 게시해 주셔야합니다.
          <br />
          부득이한 사유로 참여하지 못하는 분, 참여하시는 분들 모두 꼭 참여여부
          체크 부탁드립니다~!
        </div>
      </ContentBlock>
    </StyledEventDetails>
  );
};

export default EventDetails;
