import NavMenu from '@/components/Admin/NavMenu';
import styled from 'styled-components';
import TopBar from '@/components/Admin/TopBar';
import Cardinal from '@/components/Member/Cardinal';
import { PageWrapper, Container } from './AdminMember';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const DuesWrapper = styled.div`
  width: 814px;
  background-color: #ffffff;
`;

const AdminDues: React.FC = () => {
  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="회비 관리"
          description="기수 시작시 이월된 회비와 해당 기수 회비를 종합해 회비를 등록해주시기 바랍니다. 회비 등록은 기수당 한 번만 가능합니다."
        />
        <Container>
          <Cardinal />
          <DuesWrapper>총 회비</DuesWrapper>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminDues;
