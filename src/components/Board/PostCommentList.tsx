import { Line } from '@/styles/attend/ModalAttend.styled';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;
const PostCommentList = () => {
  return (
    <Container>
      <Line />
      <div> 댓글</div>
      <div> 댓글 </div>
      <div> 댓글 </div>
    </Container>
  );
};

export default PostCommentList;
