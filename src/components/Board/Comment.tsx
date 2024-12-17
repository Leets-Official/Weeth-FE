import theme from '@/styles/theme';
import styled from 'styled-components';
import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: start;
`;

const NameText = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
`;

const ContentText = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
  margin-top: 10px;
`;

const DateText = styled.div`
  color: #c1c1c1;
  font-size: 12px;
  margin-top: 5px;
`;

const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

interface CommentProps {
  name: string;
  content: string;
  time: string;
}

const Comment = ({ name, content, time }: CommentProps) => {
  const onClickReply = () => {
    console.log('답댓');
  };

  const onClickMenu = () => {
    console.log('삭제');
  };

  return (
    <Container>
      <CommentContainer>
        <NameText>{name}</NameText>
        <ContentText>{content}</ContentText>
        <DateText>{time}</DateText>
      </CommentContainer>
      <ButtonContainer>
        <ImageButton onClick={onClickReply}>
          <img src={ReplyImage} alt="답댓글 버튼" />
        </ImageButton>
        <ImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </ImageButton>
      </ButtonContainer>
    </Container>
  );
};

export default Comment;
