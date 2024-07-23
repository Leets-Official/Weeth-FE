import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import icDot from '../../assets/images/ic_dot.svg';
import mockEventYear from '../mockData/mockEventYear';

const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grayScale.gray18};
  padding: 10px;
  margin-bottom: 15px;
  width: 143px; //사이즈 수정 필요
  border-radius: 10px;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

const MonthName = styled.div`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.isToday ? '#00dda8' : '#ffffff')};
  //eslint 이슈로 색상코드를 작성하였음
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const EventComponent = ({ event }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{event.title}</div>
    </Content>
  );
};

const MonthlyEvent = ({ month, todayMonth }) => {
  const isToday = month === todayMonth;
  return (
    <StyledYear>
      <MonthName isToday={isToday}>{month}월</MonthName>
      <ContentWrapper>
        {mockEventYear[month].map((event) => (
          <EventComponent event={event} />
        ))}
      </ContentWrapper>
    </StyledYear>
  );
};

EventComponent.propTypes = {
  event: PropTypes.string.isRequired,
};

MonthlyEvent.propTypes = {
  month: PropTypes.number.isRequired,
  todayMonth: PropTypes.number.isRequired,
};

export default MonthlyEvent;
