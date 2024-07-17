import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import HomeMiddle from '../components/home/HomeMiddle';
import HomeFooter from '../components/home/HomeFooter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px; 
  margin-top: 50px;
  margin-left: 100px;
`;

const Header = styled.header`
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${theme.color.main.mainColor};
  border: none;
  cursor: pointer;
  font-size: 40px;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
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
