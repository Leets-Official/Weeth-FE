import styled from 'styled-components';
import logo from '@/assets/images/logo/logo_initial_Xmas.svg';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: flex-start;
  color: black;
  box-sizing: border-box;
`;

const Sidebar = styled.div`
  width: 248px;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f2f9f8;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const StyledTitle = styled.div`
  font-weight: 500;
`;
const NavMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <img src={logo} alt="weeth로고" />
        <StyledTitle>WEETH ADMIN</StyledTitle>
      </Sidebar>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
export default NavMenu;

