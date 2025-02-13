import theme from '@/styles/theme';
import backarrow from '@/assets/images/ic_admin_backarrow.svg';
import { useState } from 'react';
import useAdminActions from '@/hooks/admin/useAdminActions';
import styled from 'styled-components';
import { useMemberContext } from './context/MemberContext';
import { Title } from './TopBar';
import ButtonGroup from './ButtonGroup';
import CardinalEditModal from './Modal/CardinalEditModal';

const SelectedTopBarWrapper = styled.div`
  width: 100%;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  padding-left: 55px;
`;

const SvgIcon = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
`;

const SelectedTopBar: React.FC = () => {
  const { selectedMembers, setSelectedMembers, members } = useMemberContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleAction } = useAdminActions();

  const handleBackClick = () => {
    setSelectedMembers([]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const selectedRoles = selectedMembers.map(
    (id) => members.find((m) => m.id === Number(id))?.role,
  );

  const hasMixedRoles =
    selectedRoles.includes('ADMIN') && selectedRoles.includes('USER');

  const allAdmins = selectedRoles.every((role) => role === 'ADMIN');
  const allUsers = selectedRoles.every((role) => role === 'USER');
  const buttons = [
    {
      label: '가입 승인',
      onClick: () => handleAction('가입 승인', selectedMembers.map(Number)),
      disabled: false,
    },
    {
      label: '관리자로 변경',
      onClick: () => handleAction('관리자로 변경', selectedMembers.map(Number)),
      disabled: hasMixedRoles || allAdmins,
    },
    {
      label: '사용자로 변경',
      onClick: () => handleAction('사용자로 변경', selectedMembers.map(Number)),
      disabled: hasMixedRoles || allUsers,
    },
    {
      label: '비밀번호 초기화',
      onClick: () =>
        handleAction('비밀번호 초기화', selectedMembers.map(Number)),
      disabled: false,
    },
    {
      label: '유저 추방',
      onClick: () => handleAction('유저 추방', selectedMembers.map(Number)),
      disabled: false,
    },
    {
      label: '기수 변경',
      onClick: handleOpenModal,
      disabled: false,
    },
  ];

  return (
    <>
      <SelectedTopBarWrapper>
        <TitleContainer>
          <SvgIcon src={backarrow} alt="뒤로가기" onClick={handleBackClick} />
          <Title>{`${selectedMembers.length}명 선택됨`}</Title>
        </TitleContainer>
        <ButtonGroup buttons={buttons} />
      </SelectedTopBarWrapper>

      {isModalOpen && (
        <CardinalEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          top="70px"
          left="75%"
          position="absolute"
          overlayColor="transparent"
        />
      )}
    </>
  );
};

export default SelectedTopBar;
