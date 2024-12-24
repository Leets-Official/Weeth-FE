import styled from 'styled-components';
import theme from '@/styles/theme';
import CommentSend from '@/assets/images/ic_send.svg';

const Container = styled.div`
  width: 80%;
  height: 37px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 20px;
  background-color: ${theme.color.main};
  color: white;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: white;
  }
`;

const SendButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CommentInput = () => {
  return (
    <Container>
      <Input placeholder="댓글을 입력하세요." />
      <SendButton src={CommentSend} alt="댓글 입력 버튼" />
    </Container>
  );
};

export default CommentInput;
