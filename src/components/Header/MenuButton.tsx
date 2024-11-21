import icMenu from '@/assets/images/ic_menu.svg';
import React from 'react';
import styled from 'styled-components';

interface MenuButtonProps {
  onClick: () => void;
}

const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return <ImgButton onClick={onClick} src={icMenu} alt="menu" />;
};

export default MenuButton;
