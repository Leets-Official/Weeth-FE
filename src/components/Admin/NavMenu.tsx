import styled from 'styled-components';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';

const Sidebar = styled.div`
  width: 248px;
  height: 100vh;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-weight: 500;
`;

const NavMenu: React.FC = () => {
  return (
    <Sidebar>
      <img src={logo} alt="weeth로고" />
      <StyledTitle>WEETH ADMIN</StyledTitle>
    </Sidebar>
  );
};
export default NavMenu;

