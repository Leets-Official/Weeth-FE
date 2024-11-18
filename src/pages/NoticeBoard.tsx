import { Header } from '@/styles/attend/AttendCheck.styled';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const NoticeBoard = () => {
  return (
    <Container>
      <Header title="게시판" />
      <Info />
      <PostList />
    </Container>
  );
};

export default NoticeBoard;
