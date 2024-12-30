import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deletComment';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
  postId: number;
  path: string;
  onDelete: () => void;
}

const ReplyComment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  onDelete,
}: ReplyCommentProps) => {
  const onClickMenu = () => {
    deleteComment(path, postId, commentId);
    onDelete();
  };
  // TODO: 이름 비교해서 내 답글일 경우만 메뉴 버튼 보이도록
  return (
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContentContainer>
        <S.NameText>{name}</S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{time}</S.DateText>
        <S.ReplyImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </S.ReplyImageButton>
      </S.ReplyContentContainer>
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
