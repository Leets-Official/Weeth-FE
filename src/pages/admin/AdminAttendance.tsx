import NavMenu from '@/components/Admin/NavMenu';
import TopBar from '@/components/Admin/TopBar';
import Cardinal from '@/components/Admin/Cardinal';
import Attendance from '@/components/Admin/Attendance';
import styled from 'styled-components';
import { PageWrapper, ContentWrapper } from '@/styles/admin/AdminLayout.styled';
import { useState } from 'react';

const AttendanceWrapper = styled.div`
  width: 887px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const AdminAttendance: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');
  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="출석 관리"
          description="기수를 선택하고, 해당 모임에 대한 출석을 수정하는 페이지입니다."
        />
        <Container>
          <Cardinal
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={setSelectedCardinal}
          />
          <AttendanceWrapper>
            <Attendance />
          </AttendanceWrapper>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminAttendance;
