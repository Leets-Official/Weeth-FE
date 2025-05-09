import styled from 'styled-components';
import theme from '@/styles/theme';

interface MenuItemsProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
export const MenuItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: 36px;
  background-color: ${({ active }) =>
    active ? `${theme.color.main}` : 'transparent'};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;

  svg {
    fill: currentColor;
    width: 24px;
    height: 24px;
  }
`;

export const Label = styled.div`
  padding-left: 12px;
  font-weight: 500;
`;

const NavMenuItem: React.FC<MenuItemsProps> = ({
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <MenuItemWrapper active={active} onClick={onClick}>
      {icon}
      <Label>{label}</Label>
    </MenuItemWrapper>
  );
};

export default NavMenuItem;
