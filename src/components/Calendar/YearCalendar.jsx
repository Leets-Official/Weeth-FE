import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MonthlyEvent from './MonthlyEvent';

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 370px;
  padding-bottom: 183px;
`;

const EvenMonth = styled.div`
  padding-left: 15px;
`;

const OddMonth = styled.div`
  padding-right: 15px;
`;

const allMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearCalendar = ({ month, year }) => {
  const yearNumber = parseInt(year, 10); // 문자열을 숫자로 변환
  return (
    <MonthlyBox>
      <EvenMonth>
        {allMonth
          .filter((monthItem) => monthItem % 2 !== 0)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              month={month}
              year={yearNumber}
            />
          ))}
      </EvenMonth>
      <OddMonth>
        {allMonth
          .filter((monthItem) => monthItem % 2 === 0)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              month={month}
              year={yearNumber}
            />
          ))}
      </OddMonth>
    </MonthlyBox>
  );
};

YearCalendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default YearCalendar;
