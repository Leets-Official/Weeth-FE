import { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CommentSend from '@/assets/images/ic_send.svg';
import createComment from '@/api/usePostComment';

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
    font-family: ${theme.font.semiBold};
  }
`;

const SendButton = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const CommentInput = ({
  postId,
  onCommentSuccess,
}: {
  postId: number;
  onCommentSuccess?: () => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickSend = async () => {
    if (inputValue.trim() === '') {
      alert('댓글을 입력하세요.');
      return;
    }

    try {
      // 댓글 작성 API 호출
      await createComment(postId, inputValue);
      console.log('댓글 작성 성공');
      // 입력 필드 초기화
      setInputValue('');
      // 부모 컴포는트로 댓글 작성 알림
      if (onCommentSuccess) onCommentSuccess();
    } catch (error: any) {
      console.error(
        '댓글 작성 중 에러:',
        error.response?.data?.message || error.message,
      );
      alert('댓글 작성에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Input
        placeholder="댓글을 입력하세요."
        value={inputValue}
        onChange={handleInputChange}
      />
      <SendButton
        src={CommentSend}
        alt="댓글 입력 버튼"
        onClick={onClickSend}
      />
    </Container>
  );
};

export default CommentInput;
