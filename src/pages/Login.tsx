import axios from 'axios';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import toggleInvisibleIcon from '@/assets/images/ic_toggleInvisible.svg';
import toggleVisibleIcon from '@/assets/images/ic_toggleVisible.svg';
import Header from '@/components/Header/Header';
import SignupTextComponent from '@/components/Signup/SignupTextComponent';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const LoginTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  margin-left: 7%;
`;

const LoginSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 30px;
  line-height: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  margin-left: 7%;
`;

const LoginHeaderMargin = styled.div`
  margin-bottom: 30px;
`;

const TextMargin = styled.div`
  margin-top: 30px;
`;

const ErrorMessage = styled.div`
  right: 0;
  color: ${theme.color.negative};
  margin: 15px 0 0 -5%;
  font-size: 14px;
  text-align: right;
  width: 100%;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 315px;
  height: 50px;
  border-radius: 10px;
  background-color: #00dda8;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  margin-top: 100px;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login: React.FC = () => {
  useCustomBack('/accountcheck');

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (validEmail: string): boolean => {
    return (
      validEmail.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null
    );
  };

  const validatePwd = (pw: string): boolean => {
    return pw.length >= 6 && pw.length <= 12;
  };

  const isEmailValid = email && validateEmail(email);
  const isPwdValid = password && validatePwd(password);
  const isAllValid = isEmailValid && isPwdValid;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(emailValue);
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwValue = e.target.value.replace(
      /[~!@#$%";'^,&*()_+|</>=>`?:{}\\]/g,
      '',
    );
    setPassword(pwValue);
    setError(null);
  };

  const handleLogin = async () => {
    if (email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!validateEmail(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }
    if (password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 6 || password.length > 12) {
      alert('비밀번호를 6~12자리로 입력해 주세요.');
      return;
    }
    const params = {
      email,
      password,
      kakaoId: Number(localStorage.getItem('kakaoId')),
    };

    try {
      const BASE_URL = import.meta.env.VITE_API_URL as string;
      console.log('params', params);
      const response = await axios.patch(
        `${BASE_URL}/api/v1/users/kakao/link`,
        params,
      );

      if (response.status === 200) {
        setError(null);
        console.log('응답', response.data);
        navigate('/home');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data);
        redirect('/');
      } else if (err instanceof Error) {
        setError(err.message);
        redirect('/');
      } else {
        setError('서버로부터 응답을 받지 못했습니다.');
        redirect('/login');
      }
    }
  };

  return (
    <Container>
      <Header
        isComplete={!!isAllValid && isPwdValid && isEmailValid}
        RightButtonType="none"
      />
      <LoginHeaderMargin />
      <LoginTitle>계정 연동하기</LoginTitle>
      <LoginSubTitle>
        연동이 완료되면 &nbsp;
        <p
          style={{
            color: '#508FFF',
          }}
        >
          홈
        </p>
        으로 이동합니다.
      </LoginSubTitle>
      <SignupTextComponent
        text="E-mail"
        value={email}
        onChange={handleEmailChange}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder="ex) weeth@gmail.com"
        type="text"
        // eslint-disable-next-line react/no-children-prop
        children=""
      />
      <TextMargin />
      <SignupTextComponent
        text="PW"
        value={password}
        onChange={handlePasswordChange}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder="6~12자리 / 영문 대소문자, 숫자 조합"
        type={passwordVisible ? 'text' : 'password'}
      >
        {passwordVisible ? (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <img
            src={toggleVisibleIcon}
            alt=""
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <img
            src={toggleInvisibleIcon}
            alt=""
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        )}
      </SignupTextComponent>
      <ErrorMessage>{error}</ErrorMessage>
      <LoginButtonContainer>
        <LoginButton onClick={handleLogin}>연동하기</LoginButton>
      </LoginButtonContainer>
    </Container>
  );
};

export default Login;
