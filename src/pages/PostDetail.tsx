import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const PostDetail = () => {
  const openModal = () => {
    console.log('모달 열림');
  };
  return (
    <Container>
      <Header
        title="게시판"
        RightButtonType="MENU"
        isAccessible
        onClickRightButton={openModal}
      />
      <PostDetailMain />
      <PostCommentList />
    </Container>
  );
};

export default PostDetail;
