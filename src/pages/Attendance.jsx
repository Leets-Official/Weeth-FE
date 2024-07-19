import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import AttendHeader from '../components/Attendance/AttendHeader';
import AttendMain from '../components/Attendance/AttendMain';

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

const Attendance = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Main>
          <AttendHeader text="출석" />
        </Main>
        <Footer>
          <AttendMain />
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default Attendance;
