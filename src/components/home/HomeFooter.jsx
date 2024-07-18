import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledHomeFooter = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  width: 86.8%;
  margin: 8% 6.6% 0px 6.6%;
`;

const ScrollContainer = styled.div`
  display: flex;
  width: 94%;
  margin: 4% 3% 0px 3%;
  overflow-x: auto;
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
  width: 34%;
  height: 87px;
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
      <StyledHomeFooter>From Leets</StyledHomeFooter>
      <ScrollContainer>
        <GridItem>홈페이지</GridItem>
        <GridItem>Instagram</GridItem>
        <GridItem>Discord</GridItem>
        <GridItem>Github</GridItem>
      </ScrollContainer>
      <StyledHomeFooter>Leets의 프로젝트를 둘러보세요!</StyledHomeFooter>
      <ScrollContainer>
        <GridItem>MoodMate</GridItem>
        <GridItem>filing</GridItem>
        <GridItem>Gradu</GridItem>
      </ScrollContainer>
    </>
  );
};

export default HomeFooter;
