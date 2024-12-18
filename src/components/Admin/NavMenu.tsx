import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: flex-start;
  color: black;
`;

const Sidebar = styled.div`
  width: 248px;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const Topbar = styled.div`
  height: 78px;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #f2f2f2;
`;

// const MainContent = styled.div`
//   flex: 1;
//   background-color: #f2f9f8;
//   border: 1px solid #f2f2f2;
// `;

const NavMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container>
      <Sidebar>
        <h1>Weeth admin</h1>
      </Sidebar>
      <ContentWrapper>
        <Topbar>로그인</Topbar>
        <div>{children}</div>
      </ContentWrapper>
    </Container>
  );
};
export default NavMenu;

