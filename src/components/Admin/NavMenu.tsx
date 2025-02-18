import styled from 'styled-components';
import NavHeader from '@/components/Admin/NavHeader';
import NavMenuList from '@/components/Admin/NavMenuList';

const NavMenuWrapper = styled.div`
  width: 250px;
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
