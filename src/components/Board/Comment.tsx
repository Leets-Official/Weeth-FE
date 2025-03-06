import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import { useState } from 'react';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';
// import SelectModal from '../Modal/SelectModal';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  postId: number;
  commentId: number;
  path: string;
  position: string;
  role: string;
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
  role,
  onDelete,
  onReply,
}: CommentProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickReply = () => {
    console.log('답댓', commentId);
    onReply(commentId);
    setIsHighlighted((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickMenu = () => {
    setIsModalOpen(true);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(path, postId, commentId);
      onDelete();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const formattedTime = formatDateTime(time);

  const isMyComment = name === useGetUserName();

  return (
    <S.CommentContainer isHighlighted={isHighlighted}>
      <S.CommentContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
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
      {isModalOpen && (
        <SelectModal
          title="댓글 삭제"
          content="댓글을 정말 삭제하시겠습니까?"
          onClose={handleCloseModal}
          onDelete={handleDeleteComment}
        />
      )}
    </S.CommentContainer>
  );
};

export default Comment;
