import SearchBar from '@/components/Admin/SearchBar';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f2f9f8;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const AdminMember: React.FC = () => {
  return (
    <PageWrapper>
      <Container>
        <SearchBar />
        <div>멤버</div>
      </Container>
    </PageWrapper>
  );
};

export default AdminMember;

