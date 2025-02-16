import { useLocation, useNavigate } from 'react-router-dom';
import UserIcon from '@/assets/images/ic_admin_user.svg';
import CheckIcon from '@/assets/images/ic_admin_attendance.svg';
import PenaltyIcon from '@/assets/images/ic_admin_penalty.svg';
import DueIcon from '@/assets/images/ic_admin_due.svg';
import ArrowIcon from '@/assets/images/ic_admin_service_transfer.svg';
import ManualIcon from '@/assets/images/ic_admin_manual.svg';
import styled from 'styled-components';
import NavMenuItem from './NavMenuItem';

const MenuListWrapper = styled.div`
  padding: 20px 0 20px 0;
`;

const SectionHeader = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  padding: 0 20px;
  margin: 20px 0 20px 0;
`;
const NavMenuList: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();

  const managementItems = [
    {
      id: 'member',
      icon: <img src={UserIcon} alt="멤버 관리" />,
      label: '멤버 관리',
      path: '/admin/member',
    },
    {
      id: 'attendance',
      icon: <img src={CheckIcon} alt="출석 관리" />,
      label: '출석 관리',
      path: '/admin/attendance',
    },
    {
      id: 'penalty',
      icon: <img src={PenaltyIcon} alt="페널티 관리" />,
      label: '페널티 관리',
      path: '/admin/penalty',
    },
    {
      id: 'dues',
      icon: <img src={DueIcon} alt="회비 관리" />,
      label: '회비 관리',
      path: '/admin/dues',
    },
  ];

  const navigationItems = [
    {
      id: 'service',
      icon: <img src={ArrowIcon} alt="서비스로 이동" />,
      label: '서비스로 이동',
    },
    {
      id: 'manual',
      icon: <img src={ManualIcon} alt="관리자 메뉴얼" />,
      label: '관리자 메뉴얼',
    },
  ];

  const handleNavigationClick = (id: string) => {
    if (id === 'service') {
      window.location.href = 'https://weeth.site';
    } else if (id === 'manual') {
      console.log('추후에 추가');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <MenuListWrapper>
      <SectionHeader>관리 메뉴</SectionHeader>
      {managementItems.map((item) => (
        <NavMenuItem
          key={`managementItems-${item.id}`}
          icon={item.icon}
          label={item.label}
          active={isActive(item.path)}
          onClick={() => nav(item.path)}
        />
      ))}
      <SectionHeader>이동</SectionHeader>
      {navigationItems.map((item) => (
        <NavMenuItem
          key={`navigation-${item.id}`}
          icon={item.icon}
          label={item.label}
          onClick={() => handleNavigationClick(item.id)}
          // active={activeIndex === index + managementItems.length}
          // onClick={() => }
        />
      ))}
    </MenuListWrapper>
  );
};

export default NavMenuList;
