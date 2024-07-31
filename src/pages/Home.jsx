import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import HomeMain from '../components/home/HomeMain';
import HomeFooter from '../components/home/HomeFooter';
import LogoutButton from '../components/LogoutButton';
import UserAPI from '../hooks/UserAPI';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 45px 0px 0 0px;
  align-items: center;
`;

const Header = styled.header`
  font-family: ${theme.font.family.pretendard_semiBold};
  background-color: ${theme.color.grayScale.gray12};
  color: ${theme.color.main.mainColor};
  border: none;
  font-size: 40px;
  padding-left: 5%;
`;

const Main = styled.main`
  width: 100%;
  margin-top: 33px;
`;

const Footer = styled.footer`
  width: 100%;
`;

const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  // eslint-disable-next-line no-console
  console.log('home token', accessToken, refreshToken);
  return (
    <ThemeProvider theme={theme}>
      <UserAPI />
      <Container>
        <HeaderContainer>
          <Header>Weeth</Header>
          <LogoutButton />
        </HeaderContainer>
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
