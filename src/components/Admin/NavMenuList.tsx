import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  font-weight: bold;
  color: #000;
  padding: 0 20px;
  margin: 20px 0 20px 0;
`;
const NavMenuList: React.FC = () => {
  const nav = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const managementItems = [
    {
      icon: <img src={UserIcon} alt="멤버 관리" />,
      label: '멤버 관리',
      path: '/admin/member',
    },
    {
      icon: <img src={CheckIcon} alt="출석 관리" />,
      label: '출석 관리',
      path: '/admin/attendance',
    },
    {
      icon: <img src={PenaltyIcon} alt="페널티 관리" />,
      label: '페널티 관리',
      path: '/admin/penalty',
    },
    {
      icon: <img src={DueIcon} alt="회비 관리" />,
      label: '회비 관리',
      path: '/admin/dues',
    },
  ];

  const navigationItems = [
    {
      icon: <img src={ArrowIcon} alt="서비스로 이동" />,
      label: '서비스로 이동',
    },
    {
      icon: <img src={ManualIcon} alt="관리자 메뉴얼" />,
      label: '관리자 메뉴얼',
    },
  ];

  return (
    <MenuListWrapper>
      <SectionHeader>관리 메뉴</SectionHeader>
      {managementItems.map((item, index) => (
        <NavMenuItem
          key={index}
          icon={item.icon}
          label={item.label}
          active={activeIndex === index}
          onClick={() => {
            setActiveIndex(index);
            nav(item.path);
          }}
        />
      ))}
      <SectionHeader>이동</SectionHeader>
      {navigationItems.map((item, index) => (
        <NavMenuItem
          key={index + managementItems.length}
          icon={item.icon}
          label={item.label}
          active={activeIndex === index + managementItems.length}
          onClick={() => setActiveIndex(index + managementItems.length)}
        />
      ))}
    </MenuListWrapper>
  );
};

export default NavMenuList;
