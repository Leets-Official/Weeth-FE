import theme from '@/styles/theme';
import backarrow from '@/assets/images/ic_admin_backarrow.svg';
import { useState } from 'react';
import useAdminActions from '@/hooks/admin/useAdminActions';
import styled from 'styled-components';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import { Title } from '@/components/Admin/TopBar';
import ButtonGroup from '@/components/Admin/ButtonGroup';
import CardinalEditModal from '@/components/Admin/Modal/CardinalEditModal';

const SelectedTopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 1500px;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  z-index: 200;
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
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const { handleAction } = useAdminActions();

  const handleOpenModal = () => {
    setSelectedUserIds(selectedMembers.map(Number));
    setIsModalOpen(true);
  };

  const handleBackClick = () => {
    setSelectedMembers([]);
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

  const selectedStatuses = selectedMembers.map(
    (id) => members.find((m) => m.id === Number(id))?.status,
  );
  const hasApprovedMembers = selectedStatuses.includes('승인 완료');

  const buttons = [
    {
      label: '가입 승인',
      onClick: () => handleAction('가입 승인', selectedMembers.map(Number)),
      disabled: hasApprovedMembers,
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
      style: {
        backgroundColor: isModalOpen
          ? theme.color.gray[18]
          : theme.color.gray[100],
        color: isModalOpen ? theme.color.gray[100] : '#000',
      },
    },
  ];

  return (
    <>
      <SelectedTopBarWrapper>
        <TitleContainer>
          <SvgIcon src={backarrow} alt="뒤로가기" onClick={handleBackClick} />
          <Title>{`${selectedMembers.length}명 선택됨`}</Title>
        </TitleContainer>
        <ButtonGroup buttons={buttons} isHeader />
      </SelectedTopBarWrapper>

      {isModalOpen && (
        <CardinalEditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          top="70px"
          left="75%"
          position="fixed"
          overlayColor="transparent"
          selectedUserIds={selectedUserIds}
        />
      )}
    </>
  );
};

export default SelectedTopBar;
