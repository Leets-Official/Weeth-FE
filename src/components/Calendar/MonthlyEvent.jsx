import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import icDot from '../../assets/images/ic_dot.svg';
// import mockEventYear from '../mockData/mockEventYear';
import { EventContext } from '../../hooks/EventContext';
import EventAPI from '../../hooks/EventAPI';

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

const EventComponent = ({ title }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </Content>
  );
};

// thisMonth : 렌더링하고 있는 달 (1~12ㄴ)
// month : 오늘이 몇월?
const MonthlyEvent = ({ thisMonth, month, year }) => {
  const { yearEventData, error } = useContext(EventContext);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!yearEventData) {
    return <div>Loading...</div>;
  }

  // props로 받은 thisMonth가 현재날짜의 달과 일치한다면 isToday = true
  const isToday = thisMonth === month;
  const events = yearEventData[thisMonth] || [];

  return (
    <StyledYear>
      <EventAPI year={year} />
      <MonthName isToday={isToday}>{thisMonth}월</MonthName>
      <ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => <EventComponent title={event.title} />)
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </ContentWrapper>
    </StyledYear>
  );
};

EventComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

MonthlyEvent.propTypes = {
  thisMonth: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default MonthlyEvent;
