import styled from 'styled-components';
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
  margin-top: 25px;
  align-items: center;
`;

const Header = styled.img`
  padding-left: 5%;
`;

const Home: React.FC = () => {
  useCustomBack('/home');
  return (
    <Container>
      <HeaderContainer>
        <Header src={logo} alt="leets로고" />
        <LogoutButton />
      </HeaderContainer>
      <HomeNotice />
      <HomeInfo />
      <HomeMain />
      <HomeFooter />
    </Container>
  );
};

export default Home;
