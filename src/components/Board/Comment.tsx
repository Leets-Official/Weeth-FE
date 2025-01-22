import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import { useState } from 'react';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import FEIcon from '@/assets/images/ic_FE_color.svg';
import BEIcon from '@/assets/images/ic_BE_color.svg';
import DEIcon from '@/assets/images/ic_DE_color.svg';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  postId: number;
  commentId: number;
  path: string;
  position: string;
  onDelete: () => void;
  onReply: (commentId: number) => void;
}

const Comment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  position,
  onDelete,
  onReply,
}: CommentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const onClickReply = () => {
    console.log('답댓', commentId);
    onReply(commentId);
    setIsHighlighted((prev) => !prev);
  };

  const onClickMenu = () => {
    console.log('삭제', commentId);
    deleteComment(path, postId, commentId);
    onDelete();
  };

  const formattedTime = formatDateTime(time);

  const isMyComment = name === useGetUserName();

  // 포지션별 아이콘 매핑
  const positionIcons: Record<string, string> = {
    FE: FEIcon,
    BE: BEIcon,
    DE: DEIcon,
  };

  return (
    <S.CommentContainer isHighlighted={isHighlighted}>
      <S.CommentContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={positionIcons[position] || FEIcon}
            alt="포지션 아이콘"
          />
          {name}
        </S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{formattedTime}</S.DateText>
      </S.CommentContentContainer>
      <S.ButtonContainer>
        <S.ImageButton onClick={onClickReply}>
          <img src={ReplyImage} alt="답댓글 버튼" />
        </S.ImageButton>
        {isMyComment && (
          <S.ImageButton onClick={onClickMenu}>
            <img src={MenuImage} alt="메뉴 버튼" />
          </S.ImageButton>
        )}
      </S.ButtonContainer>
    </S.CommentContainer>
  );
};

export default Comment;
