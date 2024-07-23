import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MonthlyEvent from './MonthlyEvent';
import theme from '../../styles/theme';

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 340px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearCalendar = ({ todayMonth }) => {
  return (
    <MonthlyBox>
      {month.map((monthItem) => (
        <MonthlyEvent
          key={monthItem}
          month={monthItem}
          todayMonth={todayMonth}
        />
      ))}
    </MonthlyBox>
  );
};

YearCalendar.propTypes = {
  todayMonth: PropTypes.number.isRequired,
};

export default YearCalendar;
