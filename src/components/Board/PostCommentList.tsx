import styled from 'styled-components';
import Comment from '@/components/Board/Comment';
import ReplyComment from './ReplyComment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;
const PostCommentList = () => {
  return (
    <Container>
      <Comment />
      <ReplyComment />
    </Container>
  );
};

export default PostCommentList;
