import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MonthlyEvent from './MonthlyEvent';

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 370px;
`;

const EvenMonth = styled.div`
  padding-left: 15px;
`;

const OddMonth = styled.div`
  padding-right: 15px;
`;

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearCalendar = ({ todayMonth }) => {
  return (
    <MonthlyBox>
      <EvenMonth>
        {month
          .filter((monthItem) => monthItem % 2 !== 0)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              month={monthItem}
              todayMonth={todayMonth}
            />
          ))}
      </EvenMonth>
      <OddMonth>
        {month
          .filter((monthItem) => monthItem % 2 === 0)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              month={monthItem}
              todayMonth={todayMonth}
            />
          ))}
      </OddMonth>
    </MonthlyBox>
  );
};

YearCalendar.propTypes = {
  todayMonth: PropTypes.number.isRequired,
};

export default YearCalendar;
