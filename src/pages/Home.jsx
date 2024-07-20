import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import HomeMain from '../components/home/HomeMain';
import HomeFooter from '../components/home/HomeFooter';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Header = styled.header`
  font-family: ${theme.font.family.pretendard_semiBold};
  background-color:  ${theme.color.grayScale.gray12};
  color: ${theme.color.main.mainColor};
  border: none;
  font-size: 40px;
  padding: 9px 0px 15px 25px;
  margin: 45px 0px;
`;

const Main = styled.main`
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
          <HomeMain />
        </Main>
        <Footer>
          <HomeFooter />
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

export default Home;