import * as S from '@/styles/board/ReplyComment.styled';
import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
}

const ReplyComment = ({ name, content, time }: ReplyCommentProps) => {
  const onClickMenu = () => {
    console.log('삭제');
  };

  return (
    <S.Container>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <S.ReplyContainer>
        <S.NameText>{name}</S.NameText>
        <S.ContentText>{content}</S.ContentText>
        <S.DateText>{time}</S.DateText>
        <S.ImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </S.ImageButton>
      </S.ReplyContainer>
    </S.Container>
  );
};

export default ReplyComment;
