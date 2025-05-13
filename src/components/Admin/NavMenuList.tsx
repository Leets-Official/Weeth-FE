import { useLocation, useNavigate } from 'react-router-dom';
import UserIcon from '@/assets/images/ic_admin_user.svg?react';
import CheckIcon from '@/assets/images/ic_admin_attendance.svg?react';
import PenaltyIcon from '@/assets/images/ic_admin_penalty.svg?react';
import DueIcon from '@/assets/images/ic_admin_due.svg?react';
import ArrowIcon from '@/assets/images/ic_admin_service_transfer.svg?react';
import ManualIcon from '@/assets/images/ic_admin_manual.svg?react';
import styled from 'styled-components';
import NavMenuItem from '@/components/Admin/NavMenuItem';
import { useEffect, useState } from 'react';

const MenuListWrapper = styled.div`
  padding: 20px 0;
`;

const SectionHeader = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  padding: 0 20px;
  margin: 20px 0;
`;
const NavMenuList: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(
    location.pathname,
  );

  useEffect(() => {
    if (location.pathname === '/admin') {
      setActiveMenu('/admin/member');
    } else {
      setActiveMenu(location.pathname);
    }
  }, [location.pathname]);

  const handleInternalNavigation = (path: string) => {
    setActiveMenu(path);
    nav(path);
  };

  const managementItems = [
    {
      id: 'member',
      icon: <UserIcon />,
      label: '멤버 관리',
      path: '/admin/member',
    },
    {
      id: 'attendance',
      icon: <CheckIcon />,
      label: '출석 관리',
      path: '/admin/attendance',
    },
    {
      id: 'penalty',
      icon: <PenaltyIcon />,
      label: '패널티 관리',
      path: '/admin/penalty',
    },
    {
      id: 'dues',
      icon: <DueIcon />,
      label: '회비 관리',
      path: '/admin/dues',
    },
  ];

  const navigationItems = [
    {
      id: 'service',
      icon: <ArrowIcon />,
      label: '서비스로 이동',
      path: 'https://weeth.site',
    },
    {
      id: 'manual',
      icon: <ManualIcon />,
      label: '관리자 매뉴얼',
      path: '', // 추후 수정
    },
  ];

  const handleExternalNavigation = (id: string, path: string) => {
    setActiveMenu(id);
    if (id === 'service') {
      window.open(path, '_blank');
    } else if (id === 'manual') {
      window.open(
        'https://weeth-develop-2.s3.ap-northeast-2.amazonaws.com/Weeth+관리자+메뉴얼(v2).pdf',
        '_blank',
      );
    }
  };

  return (
    <MenuListWrapper>
      <SectionHeader>관리 메뉴</SectionHeader>
      {managementItems.map((item) => (
        <NavMenuItem
          key={`managementItems-${item.id}`}
          icon={item.icon}
          label={item.label}
          active={activeMenu === item.path}
          onClick={() => handleInternalNavigation(item.path)}
        />
      ))}
      <SectionHeader>이동</SectionHeader>
      {navigationItems.map((item) => (
        <NavMenuItem
          key={`navigation-${item.id}`}
          icon={item.icon}
          label={item.label}
          onClick={() => handleExternalNavigation(item.id, item.path)}
          active={activeMenu === item.id}
        />
      ))}
    </MenuListWrapper>
  );
};

export default NavMenuList;
