// import deleteUser from '@/api/deleteUser';
import Header from '@/components/Header/Header';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
// import useLogout from '@/hooks/useLogout';
import * as S from '@/styles/mypage/Mypage.styled';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  useCustomBack('/home');
  const navi = useNavigate();

  // TODO: 디자인 수정 완료 후 재사용 예정
  // const confirmLogout = useLogout();
  // const onClickLeave = async () => {
  //   if (window.confirm('탈퇴하시겠습니까?')) {
  //     try {
  //       await deleteUser();
  //       alert('탈퇴가 완료되었습니다.');
  //       navi('/');
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     } catch (err) {
  //       alert('탈퇴 중 오류가 발생했습니다.');
  //     }
  //   }
  // };

  return (
    <S.StyledDetails>
      <Header
        RightButtonType="EDIT"
        onClickRightButton={() => {
          navi('/edit');
        }}
        isAccessible
      >
        MY
      </Header>
      <MyInfo />
    </S.StyledDetails>
  );
};

export default MyPage;
