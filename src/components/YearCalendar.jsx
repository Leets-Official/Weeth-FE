import React from 'react';
import styled from 'styled-components';

import MonthlyEvent from './MonthlyEvent';

const MonthlyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 90vw;
`;

const mockEventYear = {
  7: [
    { title: '시간 지정', start: '2024-07-18', end: '2024-07-18T19:00:00.000' },
    { title: '시간 미지정', start: '2024-07-19', end: '2024-07-18' },
    {
      title: '일정을 길게 잡으면 이렇게 나와용',
      start: '2024-07-16',
      end: '2024-07-20',
    },
  ],
};

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
