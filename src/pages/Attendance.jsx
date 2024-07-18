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

// const Header = styled.header`
//   font-family: ${theme.font.family.pretendard_semiBold};
//   color: ${theme.color.main.mainColor};
//   border: none;
//   font-size: 40px;
// `;

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
          <AttendHeader />
        </Main>
        <Footer>
          <AttendMain />
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default Attendance;
