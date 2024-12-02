import theme from '@/styles/theme';
import styled from 'styled-components';
import Comment from '@/assets/images/ic_board_chat.svg';

type Itemprops = {
  name: string;
  time: string;
  title: string;
  content: string;
  // onClick: Node;
  totalComments: number;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

const PostLeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostRightSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const TitleText = styled.div`
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  line-height: 19.09px;
  margin: 5px 0;
`;

const ContentText = styled.div`
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 19.09px;
`;

const LightText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 12px;
  line-height: 14.32px;
`;

const CommentsText = styled(LightText)`
  margin-left: 5px;
`;
const DateText = styled(LightText)`
  margin-left: auto;
`;
const NameText = styled(LightText)`
  margin-top: 5px;
`;

const ImgContainer = styled.img`
  height: 12px;
  width: 12px;
`;

// 문자열을 10글자로 제한하고, 넘어가면 "..." 추가
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const PostListItem = ({
  name,
  time,
  title,
  content,
  // onClick,
  totalComments,
}: Itemprops) => {
  return (
    <Container>
      <PostLeftSection>
        <TitleText>{title}</TitleText>
        <ContentText>{truncateText(content, 50)}</ContentText>
        <NameText>{name}</NameText>
      </PostLeftSection>
      <PostRightSection>
        <DateText>{time}</DateText>
        <CommentContainer>
          <ImgContainer src={Comment} alt="댓글 아이콘" />
          <CommentsText>{totalComments}</CommentsText>
        </CommentContainer>
      </PostRightSection>
    </Container>
  );
};

export default PostListItem;
