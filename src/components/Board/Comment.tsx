import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
}

const Comment = ({ name, content, time, commentId }: CommentProps) => {
  const onClickReply = () => {
    console.log('답댓', commentId);
  };

  const onClickMenu = () => {
    console.log('삭제', commentId);
  };

  // TODO: userName과 props로 받아오는 name이 같아야만 메뉴 버튼이 보이도록 수정
  return (
    <S.CommentContainer>
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
