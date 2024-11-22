import { AttendProvider } from '@/api/AttendContext';
import { PenaltyProvider } from '@/api/PenaltyContext';
import UserAPI from '@/api/UserAPI';
import AttendMain from '@/components/Attendance/AttendMain';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Attendance: React.FC = () => {
  useCustomBack('/home');

  return (
    <>
      <UserAPI />
      <AttendProvider>
        <PenaltyProvider>
          <Container>
            <Header title="출석" RightButtonType="none" />
            <AttendMain />
          </Container>
        </PenaltyProvider>
      </AttendProvider>
    </>
  );
};

export default Attendance;
