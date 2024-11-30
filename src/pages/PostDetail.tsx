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
  return (
    <Container>
      {/* RightButtonType을 MENU로 수정하기  */}
      <Header title="게시판" RightButtonType="none" />
      <PostDetailMain />
      <PostCommentList />
    </Container>
  );
};

export default PostDetail;
