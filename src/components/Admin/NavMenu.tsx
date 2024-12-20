import styled from 'styled-components';
import NavHeader from './NavHeader';

const Sidebar = styled.div`
  width: 248px;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
`;

const NavMenu: React.FC = () => {
  return (
    <Sidebar>
      <NavHeader />
    </Sidebar>
  );
};

export default NavMenu;

