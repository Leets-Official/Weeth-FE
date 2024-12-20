import UserIcon from '@/assets/images/ic_admin_user.svg';
import CheckIcon from '@/assets/images/ic_admin_check.svg';
import PenaltyIcon from '@/assets/images/ic_admin_penalty.svg';
import DueIcon from '@/assets/images/ic_admin_due.svg';
import ArrowIcon from '@/assets/images/ic_admin_service_transfer.svg';
import ManualIcon from '@/assets/images/ic_admin_manual.svg';
import styled from 'styled-components';

const MenuListWrapper = styled.div`
  padding: 20px;
`;

const SectionHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
`;
const NavMenuList: React.FC = () => {
  const managementItems = [
    {
      icon: <UserIcon />,
      label: '멤버 관리',
    },
    {
      icon: <CheckIcon />,
      label: '출석 관리',
    },
    {
      icon: <PenaltyIcon />,
      label: '페널티 관리',
    },
    {
      icon: <DueIcon />,
      label: '회비 관리',
    },
  ];

  const navigationItems = [
    { icon: <ArrowIcon />, label: '서비스로 이동' },
    { icon: <ManualIcon />, label: '관리자 메뉴얼' },
  ];

  return (
    <MenuListWrapper>
      <SectionHeader></SectionHeader>
    </MenuListWrapper>
  );
};

export default NavMenuList;
