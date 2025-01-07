import Box from '@/components/Admin/Box';
import MemberListTable, { Column } from '@/components/Admin/MemberListTable';
import NavMenu from '@/components/Admin/NavMenu';
import SearchBar from '@/components/Admin/SearchBar';
import SelectedTopBar from '@/components/Admin/SelectedTopBar';
import TopBar from '@/components/Admin/TopBar';
import { BoxWrapper } from '@/components/Admin/TotalDues';
import {
  MemberProvider,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import {
  PageWrapper,
  ContentWrapper,
  Container,
} from '@/styles/admin/AdminLayout.styled';
import theme from '@/styles/theme';
import { styled } from 'styled-components';

const CardinalBoxWrapper = styled(BoxWrapper)`
  padding: 30px 0 30px 0;
`;
const boxData = [
  {
    id: 'cardinal-total',
    description: '전체',
    last: '총 100명',
    color: `${theme.color.gray[18]}`,
  },
  {
    id: 'cardinal-4',
    title: '24년 2학기(현재)',
    description: '4기',
    last: '동장 노정완 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-3',
    title: '24년 1학기',
    description: '3기',
    last: '동장 김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-2',
    title: '23년 2학기',
    description: '2기',
    last: '동장 김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-1',
    title: '23년 1학기',
    description: '1기',
    last: '동장 김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
];

const columns: Column[] = [
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
            <CardinalBoxWrapper>
              {boxData.map((cardinalBox) => (
                <Box
                  key={cardinalBox.id}
                  title={cardinalBox.title}
                  description={cardinalBox.description}
                  last={cardinalBox.last}
                  color={cardinalBox.color}
                  lastColor="#D3D3D3"
                />
              ))}
            </CardinalBoxWrapper>
            <MemberListTable columns={columns} />
          </Container>
        </ContentWrapper>
      </PageWrapper>
    </MemberProvider>
  );
};

export default AdminMember;
