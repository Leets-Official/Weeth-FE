import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import FEIcon from '@/assets/images/ic_FE_color.svg';
import BEIcon from '@/assets/images/ic_BE_color.svg';
import DEIcon from '@/assets/images/ic_DE_color.svg';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
  postId: number;
  path: string;
  position: string;
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
  onDelete,
}: ReplyCommentProps) => {
  const onClickMenu = () => {
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
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={positionIcons[position] || FEIcon}
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
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
