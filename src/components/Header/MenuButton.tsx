import icMenu from '@/assets/images/ic_menu.svg';
import styled from 'styled-components';

const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return <ImgButton onClick={onClick} src={icMenu} alt="menu" />;
};

export default MenuButton;
