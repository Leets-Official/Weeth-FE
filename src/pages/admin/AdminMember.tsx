import CardinalInfo from '@/components/Admin/CardinalInfo';
import MemberListTable from '@/components/Admin/MemberListTable';
import NavMenu from '@/components/Admin/NavMenu';
import SearchBar from '@/components/Admin/SearchBar';
import StatusIndicator from '@/components/Admin/StatusIndicator';
import TopBar from '@/components/Admin/TopBar';
import styled from 'styled-components';

const columns = [
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'major', header: '학과' },
  { key: 'cardinal', header: '기수' },
  { key: 'phone', header: '전화번호' },
  { key: 'studentId', header: '학번' },
  { key: 'position', header: '직급' },
  { key: 'attendance', header: '출석' },
  { key: 'absence', header: '결석' },
  { key: 'penalty', header: '페널티' },
  { key: 'joinDate', header: '가입일' },
];

const data = [
  {
    name: '김위드니',
    role: '프론트엔드',
    major: '소프트웨어전공',
    cardinal: '4.3.2.1',
    phone: '01000009999',
    studentId: '202036123',
    position: '사용자',
    attendance: 12,
    absence: 0,
    penalty: 12,
    joinDate: '2024.08.27',
  },
  {
    name: '박위드니',
    role: '프론트엔드',
    major: '미디어커뮤니케이션학과',
    cardinal: '4',
    phone: '01000009999',
    studentId: '202036123',
    position: '사용자',
    attendance: 12,
    absence: 0,
    penalty: 12,
    joinDate: '2024.08.27',
  },
  {
    name: '최위드니',
    role: '백엔드',
    major: '컴퓨터공학과',
    cardinal: '4.3',
    phone: '01000009999',
    studentId: '202036123',
    position: '사용자',
    attendance: 12,
    absence: 0,
    penalty: 12,
    joinDate: '2024.08.27',
  },
  {
    name: '최위드니',
    role: '백엔드',
    major: '컴퓨터공학과',
    cardinal: '4.3',
    phone: '01000009999',
    studentId: '202036123',
    position: '사용자',
    attendance: 12,
    absence: 0,
    penalty: 12,
    joinDate: '2024.08.27',
  },
];
export const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  color: #000000;
  background-color: #f2f9f8;
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const AdminMember: React.FC = () => {
  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="멤버 관리"
          description="가입 승인 등 멤버를 관리하는 페이지입니다. 정기모임을 모두 입력하신 후에 가입 승인을 해주시길 바랍니다."
        />
        <Container>
          <SearchBar />
          <CardinalInfo />
          <MemberListTable columns={columns} data={data} />
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AdminMember;
