import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MonthlyContent = styled.div`
  display: flex;
  background-color: #2e2e2e;
  padding: 10px;
  margin-bottom: 15px;
  width: 143px; //사이즈 수정 필요
  border-radius: 20px;
  font-size: 14px;
`;

const MonthName = styled.div`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.isToday ? '#00dda8' : '#ffffff')};
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const MonthlyEvent = ({ month, todayMonth }) => {
  const isToday = month === todayMonth;
  return (
    <StyledYear>
      <MonthName isToday={isToday}>{month}월</MonthName>
      <MonthlyContent>
        첫번째 일정
        <br />
        두번째 일정
      </MonthlyContent>
    </StyledYear>
  );
};

MonthlyEvent.propTypes = {
  month: PropTypes.number.isRequired,
  todayMonth: PropTypes.number.isRequired,
};

export default MonthlyEvent;
