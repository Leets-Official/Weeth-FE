import styled from 'styled-components';
import NavHeader from './NavHeader';
import NavMenuList from './NavMenuList';

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 248px;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
`;

const NavMenu: React.FC = () => {
  return (
    <Sidebar>
      <NavHeader />
      <NavMenuList />
    </Sidebar>
  );
};

export default NavMenu;

{
  /* 수정해야될 것 
  1. 클릭 시 svg - fill:white 
  2. map 함수 - key로 index 말고 다른걸로
  
  */
}

