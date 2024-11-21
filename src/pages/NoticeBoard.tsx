import { Header } from '@/styles/attend/AttendCheck.styled';
import Info from '@/components/Board/Info';
import styled from 'styled-components';
import PostList from '@/components/Board/PostList';
import NoticeHeader from '@/components/Board/NoticeHeader';
import EditDelModal from '@/components/Modal/EditDelModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const NoticeBoard = () => {
  // UserAPI에서 어드민인지 가져와서 확인하는 로직 추가
  const isAdmin = true;

  return (
    <Container>
      <NoticeHeader
        showModal={false}
        ModalComponent={EditDelModal}
        showIndexButton={false}
      />
      <Info title="공지 게시판" isbutton={isAdmin} />
      <PostList />
    </Container>
  );
};

export default NoticeBoard;
