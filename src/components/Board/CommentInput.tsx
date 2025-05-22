import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CommentSend from '@/assets/images/ic_send.svg';
import createComment from '@/api/postComment';
import { toastError } from '@/components/common/ToastMessage';

const Container = styled.div`
  width: 314px;
  height: 37px;
  display: flex;
  align-items: center;
  padding: 0 11px 0 20px;
  border-radius: 15px;
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
  initialParentCommentId = null,
  onCommentSuccess,
}: {
  postId: number;
  initialParentCommentId?: number | null;
  onCommentSuccess?: () => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  useEffect(() => {
    setParentCommentId(initialParentCommentId);
  }, [initialParentCommentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickSend = async () => {
    if (inputValue.trim() === '') {
      toastError('댓글을 입력하세요.');
      return;
    }

    try {
      await createComment(postId, inputValue, parentCommentId ?? undefined);
      setInputValue('');
      if (onCommentSuccess) onCommentSuccess();
    } catch (error: any) {
      console.error(
        '댓글 작성 중 에러:',
        error.response?.data?.message || error.message,
      );
      toastError('댓글 작성에 실패했습니다.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClickSend();
    }
  };

  return (
    <Container>
      <Input
        placeholder={
          parentCommentId ? '대댓글을 입력하세요.' : '댓글을 입력하세요.'
        }
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
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
