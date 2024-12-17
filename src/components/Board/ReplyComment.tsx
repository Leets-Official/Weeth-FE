import theme from '@/styles/theme';
import styled from 'styled-components';
import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0;
`;

const ReplyArrow = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const ReplyContainer = styled.div`
  flex: 1;
  background-color: #2f2f2f;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const NameText = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
  color: #ffffff;
`;

const ContentText = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
  color: #ffffff;
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
  position: absolute;
  top: 10px;
  right: 10px;
`;

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
    <Container>
      <ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
      <ReplyContainer>
        <NameText>{name}</NameText>
        <ContentText>{content}</ContentText>
        <DateText>{time}</DateText>
        <ImageButton onClick={onClickMenu}>
          <img src={MenuImage} alt="메뉴 버튼" />
        </ImageButton>
      </ReplyContainer>
    </Container>
  );
};

export default ReplyComment;
