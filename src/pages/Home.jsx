import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import HomeMiddle from '../components/home/HomeMiddle';
import HomeFooter from '../components/home/HomeFooter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin : 50px 20px 50px 20px;
  
`;

const Header = styled.header`
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${theme.color.main.mainColor};
  border: none;
  cursor: pointer;
  font-size: 40px;
  margin-left: 45px;
`;

const Main = styled.main`
  width: 100vw;
   margin : 40px 20px 0px 20px;
`;

const Footer = styled.footer`
  width: 100vw;
  margin : 30px 20px 50px 20px;
`;

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>Weeth</Header>
        <Main>
          <HomeMiddle />
        </Main>
        <Footer>
          <HomeFooter />
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
