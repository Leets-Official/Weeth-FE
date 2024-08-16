import styled from 'styled-components';
import AttendHeader from '../components/Attendance/AttendHeader';
import ReceiptMain from '../components/Receipt/ReceiptMain';
import { DuesProvider } from '../hooks/DuesContext';
import useCustomBack from '../router/useCustomBack';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Receipt = () => {
  useCustomBack('/dues');

  return (
    <DuesProvider>
      <Container>
        <AttendHeader text="영수증" />
        <ReceiptMain />
      </Container>
    </DuesProvider>
  );
};

export default Receipt;
