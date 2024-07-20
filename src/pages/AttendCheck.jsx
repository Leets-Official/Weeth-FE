import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import AttendHeader from '../components/Attendance/AttendHeader';
import AttendCheckMain from '../components/Attendance/AttendCheckMain';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
`;

const Main = styled.main`
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
`;

const AttendCheck = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Main>
          <AttendHeader text="출석 조회" />
        </Main>
        <Footer>
          <AttendCheckMain />
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default AttendCheck;
