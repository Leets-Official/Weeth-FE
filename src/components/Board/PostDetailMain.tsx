import theme from '@/styles/theme';
import styled from 'styled-components';
import CommentImage from '@/assets/images/ic_comment_count.svg';
import Line from '../common/Line';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;

const TitleText = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
`;

const SmallText = styled.div`
  color: #c1c1c1; // 그레이 스케일 설정해주기
  font-size: 12px;
  display: flex;
  flex-direction: row;
`;

const DateText = styled.div`
  margin-left: 10px;
`;

const PostingContianer = styled.div`
  margin-top: 20px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
  white-space: pre-wrap;
`;

const CommentText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  line-height: 14.32px;
  gap: 4px;
  font-family: ${theme.font.family.pretendard_semiBold};
  margin: 14px 0 10px 0;
`;

const PostDetailMain = () => {
  return (
    <Container>
      <TitleText> 스터디 제못</TitleText>
      <SmallText>
        <div>김위드</div>
        <DateText>2024/03/43</DateText>
      </SmallText>
      <PostingContianer> 본문 </PostingContianer>
      <div> 파일 </div>
      <CommentText>
        <img src={CommentImage} alt="댓글 이미지" />
        <div>3</div>
      </CommentText>
      <Line />
    </Container>
  );
};

export default PostDetailMain;
