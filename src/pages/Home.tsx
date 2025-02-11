import styled, { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import LogoutButton from '@/components/home/LogoutButton';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';

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
  padding-left: 5%;
`;

const Main = styled.main`
  width: 100%;
  margin-top: 33px;
`;

const Footer = styled.footer`
  width: 100%;
`;

const Home: React.FC = () => {
  useCustomBack('/home');
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderContainer>
          <Header>
            <img src={logo} alt="leets로고" />
          </Header>
          <LogoutButton />
        </HeaderContainer>
        <HomeNotice />
        <Main>
          <HomeInfo />
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
