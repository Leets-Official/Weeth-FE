import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const LoginHeaderMargin = styled.div`
  margin-bottom: 119px;
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

const Login: React.FC = () => {
  useCustomBack('/');

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
    };

    try {
      const BASE_URL = import.meta.env.VITE_API_URL as string;
      const response = await axios.post(`${BASE_URL}/api/v1/login`, params);

      if (response.status === 200) {
        setError(null);
        const newToken = response.headers.authorization;
        const newRefreshToken = response.headers.authorization_refresh;
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        navigate('/home');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('서버로부터 응답을 받지 못했습니다.');
      }
    }
  };

  return (
    <Container>
      <Header
        isComplete={!!isAllValid && isPwdValid && isEmailValid}
        onClickRightButton={handleLogin}
        RightButtonType="TEXT"
      />
      <LoginHeaderMargin />
      <SignupTextComponent
        text="email"
        value={email}
        onChange={handleEmailChange}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder="ex) weeth@gmail.com"
        type="text"
        children=""
      />
      <TextMargin />
      <SignupTextComponent
        text="password"
        value={password}
        onChange={handlePasswordChange}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder="6~12자리 / 영문 대소문자, 숫자 조합"
        type={passwordVisible ? 'text' : 'password'}
      >
        {passwordVisible ? (
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
    </Container>
  );
};

export default Login;
