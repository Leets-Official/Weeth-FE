import NavMenu from '@/components/Admin/NavMenu';
import TopBar from '@/components/Admin/TopBar';
import Attendance from '@/components/Admin/Attendance';
import styled from 'styled-components';
import { PageWrapper, ContentWrapper } from '@/styles/admin/AdminLayout.styled';
import { useState } from 'react';
import TotalCardinal from '@/components/Admin/CardinalWrapper';

const AttendanceWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 55%;
  margin-left: 30px;
  margin-top: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
        <Wrapper>
          <Container>
            <TotalCardinal
              selectedCardinal={selectedCardinal}
              setSelectedCardinal={setSelectedCardinal}
            />
            <AttendanceWrapper>
              <Attendance />
            </AttendanceWrapper>
          </Container>
        </Wrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminAttendance;
