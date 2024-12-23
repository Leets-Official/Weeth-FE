import NavMenu from '@/components/Admin/NavMenu';
import TopBar from '@/components/Admin/TopBar';
import Cardinal from '@/components/Admin/Cardinal';
import Attendance from '@/components/Admin/Attendance';
import styled from 'styled-components';
import { PageWrapper } from './AdminMember';

const AttendanceWrapper = styled.div`
  width: 887px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const AdminAttendance: React.FC = () => {
  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="출석 관리"
          description="기수를 선택하고, 해당 모임에 대한 출석을 수정하는 페이지입니다."
        />
        <Container>
          <Cardinal />
          <AttendanceWrapper>
            <Attendance />
          </AttendanceWrapper>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminAttendance;
