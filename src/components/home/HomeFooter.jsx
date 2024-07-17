import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledHomeFooter = styled.div`
  margin-top: 30px;
  margin-left: -20px;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-left: -20px;
  padding: 10px;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
  }
`;

const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 10px 20px;
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  width: 20vw;
  height: 10vw;
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 14px;
  white-space: nowrap;
  &:last-child {
    margin-right: 0;
  }
`;

const HomeFooter = () => {
  return (
    <>
      <StyledHomeFooter>
        <h3>From Leets</h3>
      </StyledHomeFooter>
      <ScrollContainer>
        <GridItem>홈페이지</GridItem>
        <GridItem>Instagram</GridItem>
        <GridItem>Discord</GridItem>
        <GridItem>Github</GridItem>
      </ScrollContainer>
      <StyledHomeFooter>
        <h3>Leets의 프로젝트를 둘러보세요!</h3>
      </StyledHomeFooter>
      <ScrollContainer>
        <GridItem>MoodMate</GridItem>
        <GridItem>filing</GridItem>
        <GridItem>Gradu</GridItem>
      </ScrollContainer>
    </>
  );
};

export default HomeFooter;
