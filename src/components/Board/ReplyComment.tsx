import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';

const ReplyComment = () => {
  const onClickMenu = () => {
    console.log('삭제');
  };

  return (
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContentContainer>
        <S.NameText>김위드</S.NameText>
        <S.ContentText>ㅎㅎ 잘했죠</S.ContentText>
        <S.DateText>00/00 00:00</S.DateText>
        <S.ReplyImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </S.ReplyImageButton>
      </S.ReplyContentContainer>
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
