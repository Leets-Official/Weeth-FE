import Comment from '@/assets/images/ic_comment_count.svg';
import * as S from '@/styles/board/PostListItem.styled';

type ItemProps = {
  name: string;
  time: string;
  title: string;
  content: string;
  onClick: () => void;
  totalComments: number;
};

// 문자열을 50글자로 제한하고, 넘어가면 "..." 추가
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const PostListItem = ({
  name,
  time,
  title,
  content,
  onClick,
  totalComments,
}: ItemProps) => {
  return (
    <S.Container onClick={onClick} style={{ cursor: 'pointer' }}>
      <S.PostLeftSection>
        <S.TitleText>{title}</S.TitleText>
        <S.ContentText>{truncateText(content, 50)}</S.ContentText>
        <S.NameText>{name}</S.NameText>
      </S.PostLeftSection>
      <S.PostRightSection>
        <S.DateText>{time}</S.DateText>
        <S.CommentContainer>
          <S.ImgContainer src={Comment} alt="댓글 아이콘" />
          <S.CommentsText>{totalComments}</S.CommentsText>
        </S.CommentContainer>
      </S.PostRightSection>
    </S.Container>
  );
};

export default PostListItem;
