import styled, { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import AttendHeader from '@/components/Attendance/AttendHeader';
import AttendMain from '@/components/Attendance/AttendMain';
import { PenaltyProvider } from '@/service/PenaltyContext';
import { AttendProvider } from '@/service/AttendContext';
import useCustomBack from '@/router/useCustomBack';
import UserAPI from '@/service/UserAPI';

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

const Attendance: React.FC = () => {
  useCustomBack('/home');
  
  return (
    <ThemeProvider theme={theme}>
      <UserAPI />
      <AttendProvider>
        <PenaltyProvider>
          <Container>
            <Main>
              <AttendHeader text="출석" />
            </Main>
            <Footer>
              <AttendMain />
            </Footer>
          </Container>
        </PenaltyProvider>
      </AttendProvider>
    </ThemeProvider>
  );
};

export default Attendance;
