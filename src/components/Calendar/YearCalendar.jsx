import React from 'react';
import styled from 'styled-components';

import MonthlyEvent from './MonthlyEvent';
import mockEventYear from '../mockData/mockEventYear';

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const YearCalendar = () => {
  return (
    <MonthlyBox>
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
      <MonthlyEvent mockEventYear={mockEventYear} />
    </MonthlyBox>
  );
};

export default YearCalendar;
