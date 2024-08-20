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
  const validYear = year.toString().length === 4 ? parseInt(year, 10) : 2024; // 유효한 연도인지 확인

  const [formattedStart, setFormattedStart] = useState(
    `${validYear}-01-01T00:00:00.000Z`,
  );
  const [formattedEnd, setFormattedEnd] = useState(
    `${validYear}-12-31T23:59:59.999Z`,
  );

  useEffect(() => {
    if (year.toString().length === 4) {
      setFormattedStart(`${year}-01-01T00:00:00.000Z`);
      setFormattedEnd(`${year}-12-31T23:59:59.999Z`);
    }
  }, [year]);

  return (
    <MonthlyBox>
      <YearlyScheduleAPI start={formattedStart} end={formattedEnd} />
      <EvenMonth>
        {allMonth
          .filter((monthItem) => monthItem >= 1 && monthItem <= 6)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
            />
          ))}
      </EvenMonth>
      <OddMonth>
        {allMonth
          .filter((monthItem) => monthItem >= 7 && monthItem <= 12)
          .map((monthItem) => (
            <MonthlyEvent
              key={monthItem}
              thisMonth={monthItem}
              year={validYear}
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
