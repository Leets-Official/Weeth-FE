import styled from 'styled-components';
import theme from '@/styles/theme';

interface MenuItemsProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}
const MenuItemWrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ active }) =>
    active ? `${theme.color.main}` : 'transparent'};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    ${({ active }) => (active ? `${theme.color.main}` : 'transparent')};
  }
`;
const NavMenuItem: React.FC<MenuItemsProps> = ({
  icon,
  label,
  active = false,
}) => {
  return (
    <MenuItemWrapper active={active}>
      {icon}
      <div>{label}</div>
    </MenuItemWrapper>
  );
};

export default NavMenuItem;
