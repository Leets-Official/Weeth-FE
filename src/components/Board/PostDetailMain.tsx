import theme from '@/styles/theme';
import styled from 'styled-components';
import CommentImage from '@/assets/images/ic_comment_count.svg';
import Line from '../common/Line';
import PostFile from './PostFile';

// TODO: 스타일 분리 및 색상 코드 적용
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;

const TitleText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
`;

const SmallText = styled.div`
  color: #c1c1c1;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const DateText = styled.div`
  margin-left: 10px;
`;

const PostingContianer = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  line-height: 19.09px;
  white-space: pre-wrap;
  margin: 20px 0 20px 0;
`;

const CommentText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  line-height: 14.32px;
  gap: 4px;
  font-family: ${theme.font.semiBold};
  margin: 14px 0 10px 0;
`;

const PostDetailMain = () => {
  const onClickDownload = () => {
    console.log('파일 다운');
  };
  return (
    <Container>
      <TitleText> 스터디 제못</TitleText>
      <SmallText>
        <div>김위드</div>
        <DateText>2024/03/43</DateText>
      </SmallText>
      <PostingContianer> 본문 </PostingContianer>
      <PostFile
        fileName="파일이름이 길어질 때, 사실 그렇게 보이면.pdf"
        isDownload
        onClick={onClickDownload}
      />
      <CommentText>
        <img src={CommentImage} alt="댓글 이미지" />
        <div>3</div>
      </CommentText>
      <Line />
    </Container>
  );
};

export default PostDetailMain;
