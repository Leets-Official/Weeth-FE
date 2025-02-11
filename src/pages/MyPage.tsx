/* eslint-disable no-alert */
import deleteUser from '@/api/deleteUser';
import MenuModal from '@/components/common/MenuModal';
import Header from '@/components/Header/Header';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
import useLogout from '@/hooks/useLogout';
import * as S from '@/styles/mypage/Mypage.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  useCustomBack('/home');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const confirmLogout = useLogout();
  const onClickLeave = async () => {
    // TODO: 공통 모달로 수정 필요
    if (window.confirm('탈퇴하시겠습니까?')) {
      try {
        await deleteUser();
        alert('탈퇴가 완료되었습니다.');
        navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert('탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <S.Container>
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <S.TextButton
            onClick={() => {
              navigate('/edit');
            }}
          >
            정보 수정
          </S.TextButton>
          <S.TextButton onClick={confirmLogout}>로그아웃</S.TextButton>
          <S.TextButton isSignOut onClick={onClickLeave}>
            탈퇴
          </S.TextButton>
        </MenuModal>
      )}

      <Header
        RightButtonType="MENU"
        onClickRightButton={() => {
          setIsModalOpen(true);
        }}
        isAccessible
      >
        MY
      </Header>
      <MyInfo />
    </S.Container>
  );
};

export default MyPage;
