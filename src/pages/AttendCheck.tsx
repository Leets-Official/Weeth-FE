import styled, { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import AttendHeader from '@/components/Attendance/AttendHeader';
import AttendCheckMain from '@/components/Attendance/AttendCheckMain';
import { PenaltyProvider } from '@/api/hook/router/PenaltyContext';
import useCustomBack from '@/hooks/useCustomBack';
import UserAPI from '@/api/hook/router/UserAPI';
import { AttendCheckAPI } from '@/api/hook/router/AttendAPI';

import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Main = styled.main`
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
`;

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <ThemeProvider theme={theme}>
      <UserAPI />
      <AttendCheckAPI />
      <PenaltyProvider>
        <Container>
          <Main>
            <AttendHeader text="출석 조회" />
          </Main>
          <Footer>
            <AttendCheckMain />
          </Footer>
        </Container>
      </PenaltyProvider>
    </ThemeProvider>
  );
};

export default AttendCheck;
