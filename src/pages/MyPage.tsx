/* eslint-disable no-alert */
import deleteUser from '@/api/deleteUser';
import MenuModal from '@/components/common/MenuModal';
import Header from '@/components/Header/Header';
import DeleteModal from '@/components/Modal/DeleteModal';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
import useLogout from '@/hooks/useLogout';
import * as S from '@/styles/mypage/Mypage.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  useCustomBack('/home');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmLogout = useLogout();

  const onClickLeave = async () => {
    try {
      await deleteUser();
      // TODO: 삭제 토스트 메세지 적용
      alert('탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (err) {
      alert('탈퇴퇴 중 오류가 발생했습니다.');
      console.error(err);
    }
    closeDeleteModal();
  };

  return (
    <S.Container>
      {isDeleteModalOpen && (
        <DeleteModal
          title="회원 탈퇴"
          content="정말 탈퇴하시겠습니까?"
          buttonContent="회원 탈퇴"
          onClose={closeDeleteModal}
          onDelete={onClickLeave}
        />
      )}
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          top={60}
          right={535}
        >
          <S.TextButton
            onClick={() => {
              navigate('/edit');
            }}
          >
            정보 수정
          </S.TextButton>
          <S.TextButton onClick={confirmLogout}>로그아웃</S.TextButton>
          <S.TextButton isSignOut onClick={openDeleteModal}>
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
