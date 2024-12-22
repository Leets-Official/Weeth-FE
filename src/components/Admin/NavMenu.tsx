import styled from 'styled-components';
import NavHeader from './NavHeader';
import NavMenuList from './NavMenuList';

const NavMenuWrapper = styled.div`
  width: 248px;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
`;

const NavMenu: React.FC = () => {
  return (
    <NavMenuWrapper>
      <NavHeader />
      <NavMenuList />
    </NavMenuWrapper>
  );
};

export default NavMenu;

// 수정해야 될 것
// 클릭 시 svg 색깔 white로

