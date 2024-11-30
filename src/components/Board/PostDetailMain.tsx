import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 23px 0 23px;
`;

const TitleText = styled.div`

`;

const SmallText = styled.div`

`;

const PostingContianer = styled.div`

`;

const FileContainer = styled.div`

`;

const PostDetailMain = () => {
  return (
    <Container>
      <div> 스터디 제못</div>
      <div> 본문 </div>
      <div> 파일 </div>
    </Container>
  );
};

export default PostDetailMain;
