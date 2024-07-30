import styled from 'styled-components';
import theme from '../../styles/theme';
import leets from '../../assets/images/ic_leets.svg';
import insta from '../../assets/images/ic_insta.svg';
import discord from '../../assets/images/ic_discord.svg';
import github from '../../assets/images/ic_github.svg';

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
const ImgContainer = styled.div`
  margin-bottom: 5px;
`;

const GridItem = styled.a`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 10px 15px 15px 0;
  background-color: ${({ color }) => color || theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
  width: 34%;
  height: 77px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 16px;
  white-space: nowrap;
  text-decoration: none; /* Link 텍스트에 밑줄 제거 */
  &:last-child {
    margin-right: 0;
  }
`;

const HomeFooter = () => {
  return (
    <>
      <StyledHomeFooter>From Leets</StyledHomeFooter>
      <ScrollContainer>
        <GridItem href="https://www.leets.land/" target="_blank">
          <ImgContainer>
            <img src={leets} alt="leets" />
          </ImgContainer>
          홈페이지
        </GridItem>
        <GridItem
          href="https://www.instagram.com/leets.official/"
          target="_blank"
        >
          <ImgContainer>
            <img src={insta} alt="instagram" />
          </ImgContainer>
          Instagram
        </GridItem>
        <GridItem>
          <ImgContainer>
            <img src={discord} alt="discord" />
          </ImgContainer>
          Discord
        </GridItem>
        <GridItem href="https://github.com/Leets-Official" target="_blank">
          <ImgContainer>
            <img src={github} alt="github" />
          </ImgContainer>
          Github
        </GridItem>
      </ScrollContainer>
      <StyledHomeFooter>Leets의 프로젝트를 둘러보세요!</StyledHomeFooter>
      <ScrollContainer>
        <GridItem href="http://yourmoodmate.com" target="_blank">
          MoodMate
        </GridItem>
        <GridItem href="http://yourfiling.com" target="_blank">
          filing
        </GridItem>
        <GridItem href="http://yourgradu.com" target="_blank">
          Gradu
        </GridItem>
      </ScrollContainer>
    </>
  );
};

export default HomeFooter;
