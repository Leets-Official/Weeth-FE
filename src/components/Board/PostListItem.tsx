import theme from '@/styles/theme';
import styled from 'styled-components';
import Comment from '@/assets/images/ic_board_chat.svg';

type Itemprops = {
  name: string;
  time: string;
  title: string;
  content: string;
  onClick: Node;
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
`;

const PostRightSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoldText = styled.div`
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 16px;
  line-height: 19.09px;
`;

const LightText = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
`;

const PostListItem = ({
  name,
  time,
  title,
  content,
  onClick,
  totalComments,
}: Itemprops) => {
  return (
    <Container>
      <PostLeftSection>
        <BoldText>
          {name}
        </BoldText>
        <BoldText>
          {title}
        </BoldText>
        <LightText>
          {content}
        </LightText>
      </PostLeftSection>
      <PostRightSection>
        <LightText>
          {time}
        </LightText>
        <CommentContainer>
          <img src={Comment} alt="댓글 아이콘" />
          <LightText>{totalComments}</LightText>
        </CommentContainer>
      </PostRightSection>
    </Container>
  );
};

export default PostListItem;
