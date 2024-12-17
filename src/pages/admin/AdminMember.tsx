import SearchBar from '@/components/Admin/SearchBar';
import styled from 'styled-components';

export const Container = styled.div``;

const AdminMember: React.FC = () => {
  return (
    <Container>
      <SearchBar />
      <div>멤버</div>
    </Container>
  );
};
export default AdminMember;

