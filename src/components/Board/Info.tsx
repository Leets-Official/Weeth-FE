import theme from '@/styles/theme';
import styled from 'styled-components';

type InfoProps = {
  title: string;
  isEditButtonVisible: boolean;
};

const Container = styled.div`
  margin: 0 25px 0 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  line-height: 19.09px;
`;

const InfoText = styled.div`
  margin-top: 10px;
  font-size: 12px;
`;

const PostingButton = styled.button`
  width: calc(370px * 0.13);
  height: 28px;
  margin-top: auto;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
  border: none;
  font-size: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-family: ${theme.font.semiBold};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = ({ title, isEditButtonVisible }: InfoProps) => {
  return (
    <Container>
      <TextContainer>
        <TitleText>{title}</TitleText>
        <InfoText>자세한 내용을 보려면 게시물을 클릭하세요.</InfoText>
      </TextContainer>
      {isEditButtonVisible && <PostingButton>글쓰기</PostingButton>}
    </Container>
  );
};

export default Info;
