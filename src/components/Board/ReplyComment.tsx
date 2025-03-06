import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';
import { useState } from 'react';
import SelectModal from '@/components/Modal/SelectModal';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
  postId: number;
  path: string;
  position: string;
  role: string;
  onDelete: () => void;
}

const ReplyComment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  position,
  role,
  onDelete,
}: ReplyCommentProps) => {
  const formattedTime = formatDateTime(time);
  const isMyComment = name === useGetUserName();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
            alt="포지션 아이콘"
          />
          {name}
        </S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{formattedTime}</S.DateText>
        {isMyComment && (
          <S.ReplyImageButton onClick={onClickMenu}>
            <img src={MenuImage} alt="메뉴 버튼" />
          </S.ReplyImageButton>
        )}
      </S.ReplyContentContainer>
      {isModalOpen && (
        <SelectModal
          title="댓글 삭제"
          content="댓글을 정말 삭제하시겠습니까?"
          onClose={handleCloseModal}
          onDelete={handleDeleteComment}
        />
      )}
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
