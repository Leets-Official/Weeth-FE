import AttendCheckMain from '@/components/Attendance/AttendCheckMain';
import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <Container>
      <Header title="출석 조회" RightButtonType="none" />
      <AttendCheckMain />
    </Container>
  );
};

export default AttendCheck;
