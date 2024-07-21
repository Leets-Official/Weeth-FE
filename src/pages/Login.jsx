import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
// import SmallButton from '../components/Button/SmallButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 810px;
`;

const StyledTitle = styled.div`
  width: 53%;
  height: 76px;
  margin: 297px 24% 126px 24%;
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 700;
  font-size: 64px;
  line-height: 76.38px;
  color: #00DDA8;
  text-align: center;
`;

/* const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`; */


/* const StyledButton = styled.button`
  width: 85%;
  height: 76px;
  background-color: ${props => (props.primary ? '#00DDA8' : '#333333')};
  color: ${props => (props.primary ? '#000000' : '#7f7f7f')};
  font-family: ${props => props.theme.font.family.pretendard_semiBold};
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`; */

const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledTitle>Weeth</StyledTitle>
        
      </Container>
    </ThemeProvider>
  );
};

export default Login;

/* <SmallButton color="#00DDA8" textColor="#000000" width="197px" height="76px">회원가입</SmallButton>
          <SmallButton color="#333333" textColor="#7f7f7f" width="197px" height="76px">로그인</SmallButton> */