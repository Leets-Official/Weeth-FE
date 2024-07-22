import styled from 'styled-components';
import AttendHeader from '../components/Attendance/AttendHeader';
import ReceiptMain from '../components/Receipt/ReceiptMain';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Receipt = () => {
  return (
    <Container>
      <AttendHeader text="영수증" />
      <ReceiptMain />
    </Container>
  );
};

export default Receipt;
