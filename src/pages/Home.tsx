import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import LogoutButton from '@/components/home/LogoutButton';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';
import useGetUserInfo from '@/api/useGetUserInfo';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import Loading from '@/components/common/Loading';
import styled from 'styled-components';

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
  const { userInfo, loading: isLoadingUser } = useGetUserInfo();
  const { recentNotices, recentNoticeLoading } = useGetRecentNotice();
  const { isAdmin, loading } = useGetGlobaluserInfo();

  useCustomBack('/home');

  if (isLoadingUser || recentNoticeLoading || loading) {
    return <Loading />;
  }

  return (
    <Container>
      <HeaderContainer>
        <Header src={logo} alt="leets로고" />
        <LogoutButton />
      </HeaderContainer>
      <HomeNotice
        title={recentNotices[0].title || ' '}
        content={recentNotices[0].content || ' '}
        id={recentNotices[0].id}
      />
      <HomeInfo
        position={userInfo?.position || ''}
        cardinal={userInfo?.cardinals?.length ? userInfo.cardinals[0] : '0'}
        name={userInfo?.name || '...'}
        isAdmin={isAdmin}
      />

      <HomeMain />
      <HomeFooter />
    </Container>
  );
};

export default Home;
