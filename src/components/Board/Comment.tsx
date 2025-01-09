import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deletComment';
import { useState } from 'react';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  postId: number;
  commentId: number;
  path: string;
  onDelete: () => void;
}

const Comment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  onDelete,
}: CommentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onClickReply = () => {
    console.log('답댓', commentId);
    setIsHighlighted((prev) => !prev); // 선택 상태를 토글
  };

  const onClickMenu = () => {
    console.log('삭제', commentId);
    deleteComment(path, postId, commentId);
    onDelete();
  };

  return (
    <S.CommentContainer isHighlighted={isHighlighted}>
      <S.CommentContentContainer>
        <S.NameText>{name}</S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{time}</S.DateText>
      </S.CommentContentContainer>
      <S.ButtonContainer>
        <S.ImageButton onClick={onClickReply}>
          <img src={ReplyImage} alt="답댓글 버튼" />
        </S.ImageButton>
        <S.ImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </S.ImageButton>
      </S.ButtonContainer>
    </S.CommentContainer>
  );
};

export default Comment;
