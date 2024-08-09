import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MonthlyEvent from './MonthlyEvent';
import YearlyScheduleAPI from '../../hooks/YearlyScheduleAPI';

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

const YearCalendar = ({ year }) => {
  const yearNumber = parseInt(year, 10); // 문자열을 숫자로 변환

  const [formattedStart, setFormattedStart] = useState(
    `${year}-01-01T00:00:00.000Z`,
  );
  const [formattedEnd, setFormattedEnd] = useState(
    `${year}-12-31T23:59:59.999Z`,
  );

  useEffect(() => {
    setFormattedStart(`${year}-01-01T00:00:00.000Z`);
    // UTC 기준이라 대한민국 표준시로는 6일 23시임
    setFormattedEnd(`${year}-12-31T23:59:59.999Z`);
  }, [year]);

  return (
    <MonthlyBox>
      <YearlyScheduleAPI start={formattedStart} end={formattedEnd} />
      <EvenMonth>
        {allMonth
          .filter((monthItem) => monthItem % 2 !== 0)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
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
              year={yearNumber}
            />
          ))}
      </OddMonth>
    </MonthlyBox>
  );
};

YearCalendar.propTypes = {
  year: PropTypes.number.isRequired,
};

export default YearCalendar;
