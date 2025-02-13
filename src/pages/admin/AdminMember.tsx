import CardinalInfo from '@/components/Admin/CardinalInfo';
import MemberListTable, { Column } from '@/components/Admin/MemberListTable';
import NavMenu from '@/components/Admin/NavMenu';
import SearchBar from '@/components/Admin/SearchBar';
import SelectedTopBar from '@/components/Admin/SelectedTopBar';
import TopBar from '@/components/Admin/TopBar';
import {
  MemberProvider,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import {
  PageWrapper,
  ContentWrapper,
  Container,
} from '@/styles/admin/AdminLayout.styled';

const columns: Column[] = [
  { key: 'name', header: '이름' },
  { key: 'position', header: '역할' },
  { key: 'department', header: '학과' },
  { key: 'cardinals', header: '기수' },
  { key: 'tel', header: '전화번호' },
  { key: 'studentId', header: '학번' },
  { key: 'role', header: '직급' },
  { key: 'attendanceCount', header: '출석' },
  { key: 'absenceCount', header: '결석' },
  { key: 'penaltyCount', header: '페널티' },
  { key: 'createdAt', header: '가입일' },
];

const DynamicTopBar: React.FC = () => {
  const { selectedMembers } = useMemberContext();
  if (selectedMembers.length > 0) {
    return <SelectedTopBar />;
  }
  return (
    <TopBar
      title="멤버 관리"
      description="가입 승인 등 멤버를 관리하는 페이지입니다. 정기모임을 모두 입력하신 후에 가입 승인을 해주시길 바랍니다."
    />
  );
};

const AdminMember: React.FC = () => {
  return (
    <MemberProvider>
      <PageWrapper>
        <NavMenu />
        <ContentWrapper>
          <DynamicTopBar />
          <Container>
            <SearchBar />
            <CardinalInfo />
            <MemberListTable columns={columns} />
          </Container>
        </ContentWrapper>
      </PageWrapper>
    </MemberProvider>
  );
};

export default AdminMember;
