import deleteUser from '@/api/deleteUser';
import icEdit from '@/assets/images/ic_edit.svg';
import icLogout from '@/assets/images/ic_logout_white.svg';
import Header from '@/components/Header/Header';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
import useLogout from '@/hooks/useLogout';
import * as S from '@/styles/mypage/Mypage.styled';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  useCustomBack('/home');
  const navi = useNavigate();

  const confirmLogout = useLogout();
  const onClickLeave = async () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      try {
        await deleteUser();
        alert('탈퇴가 완료되었습니다.');
        navi('/');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert('탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <S.StyledDetails>
      <Header RightButtonType="none" isAccessible>
        MY
      </Header>
      <MyInfo />
      <S.ImgButton
        onClick={() => {
          navi(`/edit`);
        }}
      >
        <img src={icEdit} alt="Edit" />
      </S.ImgButton>
      <S.Account>
        <S.LeaveButton onClick={onClickLeave}>탈퇴하기</S.LeaveButton>
        <S.LogoutButton onClick={confirmLogout}>
          <img src={icLogout} alt="로그아웃" />
          <div>로그아웃</div>
        </S.LogoutButton>
      </S.Account>
    </S.StyledDetails>
  );
};

export default MyPage;
