import NavMenu from '@/components/Admin/NavMenu';
import SearchBar from '@/components/Admin/SearchBar';
import TopBar from '@/components/Admin/TopBar';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  /* color: #000000; */
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

const AdminMember: React.FC = () => {
  return (
    <PageWrapper>
      <NavMenu>
        <TopBar
          title="멤버 관리"
          description="가입 승인 등 멤버를 관리하는 페이지입니다. 정기모임을 모두 입력하신 후에 가입 승인을 해주시길 바랍니다."
        />
        <Container>
          <SearchBar />
          <div>멤버</div>
        </Container>
      </NavMenu>
    </PageWrapper>
  );
};
export default AdminMember;

