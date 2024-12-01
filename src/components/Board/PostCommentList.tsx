import styled from 'styled-components';
import Comment from '@/components/Board/Comment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;
const PostCommentList = () => {
  return (
    <Container>
      <Comment />
    </Container>
  );
};

export default PostCommentList;
