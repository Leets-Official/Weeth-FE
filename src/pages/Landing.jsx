import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import Button from '../components/Button/Button';

/* 높이를 810px로 잡고 각각의 margin을 px로 잡았습니다 */

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
  margin: 297px 24% 126px 24%; /* Adjusted margin */
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 700;
  font-size: 64px;
  line-height: 76.38px;
  color: #00dda8;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const SignupButton = styled(Button)`
  width: 100%; /* Adjusted width */
`;

const LoginButton = styled(Button)`
  width: 100%; /* Adjusted width */
  margin-bottom: 198px;
`;

const Landing = () => {
  const [signupClicked, setSignupClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const navi = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledTitle>Weeth</StyledTitle>
        <ButtonWrapper>
          <SignupButton
            color={signupClicked ? '#0E9871' : theme.color.main.mainColor}
            textColor={
              signupClicked ? '#097154' : theme.color.grayScale.white
            } /* Temporary colors */
            onClick={() => {
              setSignupClicked(true);
              navi(`/signup`);
            }}
          >
            회원가입
          </SignupButton>
          <LoginButton
            color={
              loginClicked
                ? theme.color.grayScale.gray20
                : theme.color.grayScale.gray30
            }
            textColor={
              loginClicked
                ? theme.color.grayScale.gray12
                : theme.color.grayScale.white
            } /* Temporary colors */
            onClick={() => {
              setLoginClicked(true);
              navi(`/login`); /* 경로 바꾸면 나중에 수정하기 */
            }}
          >
            로그인
          </LoginButton>
        </ButtonWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
