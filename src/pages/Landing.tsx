import Button from '@/components/Button/Button';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@/assets/images/logo/logo_full_Xmas.svg';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 810px;
`;

const StyledTitle = styled.div`
  margin-top: 288px;
  line-height: 76.38px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const SignupButton = styled(Button)`
  width: 100%;
`;

const LoginButton = styled(Button)`
  width: 100%;
  margin-bottom: 198px;
`;

const Landing: React.FC = () => {
  useCustomBack('/');

  const [signupClicked, setSignupClicked] = useState<boolean>(false);
  const [loginClicked, setLoginClicked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <Container>
      <StyledTitle>
        <img src={logo} alt="leets로고" />
      </StyledTitle>
      <ButtonWrapper>
        <SignupButton
          color={signupClicked ? theme.color.mainMiddle : theme.color.main}
          textcolor={
            signupClicked ? theme.color.mainDark : theme.color.gray[100]
          }
          onClick={() => {
            setSignupClicked(true);
            navigate('/signup');
          }}
        >
          회원가입
        </SignupButton>
        <LoginButton
          color={loginClicked ? theme.color.gray[20] : theme.color.gray[30]}
          textcolor={
            loginClicked ? theme.color.gray[12] : theme.color.gray[100]
          }
          onClick={() => {
            setLoginClicked(true);
            navigate('/login');
          }}
        >
          로그인
        </LoginButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Landing;
