import styled from 'styled-components';
import GetAllPosts from '@/api/BoardAPI';
import PostList from '@/components/Board/PostList';
import Info from '@/components/Board/Info';
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
  const isAdmin = true;

  return (
    <Container>
      <GetAllPosts path="notices" />
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
