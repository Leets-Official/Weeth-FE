import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';

const Comment = () => {
  const onClickReply = () => {
    console.log('답댓');
  };

  const onClickMenu = () => {
    console.log('삭제');
  };

  return (
    <S.CommentContainer>
      <S.CommentContentContainer>
        <S.NameText>길동군</S.NameText>
        <S.ContentText>우와 정말 잘햇다</S.ContentText>
        <S.DateText>2024/12/22</S.DateText>
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
