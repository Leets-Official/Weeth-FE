import HomeMain from '@/components/home/HomeMain';
import HomeFooter from '@/components/home/HomeFooter';
import LogoutButton from '@/components/home/LogoutButton';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';
import useCustomBack from '@/hooks/useCustomBack';
import HomeNotice from '@/components/home/HomeNotice';
import HomeInfo from '@/components/home/HomeInfo';
import useGetUserInfo from '@/api/useGetUserInfo';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import Loading from '@/components/common/Loading';

const Home: React.FC = () => {
  const { userInfo, isLoading: isLoadingUser } = useGetUserInfo();
  const { recentNotices, isLoading: isLoadingNotices } = useGetRecentNotice();

  useCustomBack('/home');

  if (isLoadingUser || isLoadingNotices) {
    return <Loading />;
  }

  return (
    <div>
      <img src={logo} alt="leets로고" />
      <LogoutButton />
      <HomeNotice notices={recentNotices} />
      <HomeInfo
        position={userInfo?.position || ''}
        cardinal={userInfo?.cardinals?.[userInfo.cardinals.length - 1] || '0'}
        name={userInfo?.name || '...'}
      />

      <HomeMain />
      <HomeFooter />
    </div>
  );
};

export default Home;
