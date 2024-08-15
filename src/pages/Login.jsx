import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/Login/LoginHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import { ReactComponent as ToggleVisibleIcon } from '../assets/images/ic_toggleVisible.svg';
import { ReactComponent as ToggleInvisibleIcon } from '../assets/images/ic_toggleInvisible.svg';
import Utils from '../hooks/Utils';
import useCustomBack from '../router/useCustomBack';

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
  color: #ff5858;
  margin: 15px 0 0 -5%;
  font-size: 14px;
  text-align: right;
  width: 100%;
`;

const Login = () => {
  useCustomBack('/');

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
  };

  const validatePwd = (password) => {
    return password.length >= 8;
  };

  const isEmailValid = email && validateEmail(email);
  const isPwdValid = password && validatePwd(password);
  const isAllValid = isEmailValid && isPwdValid;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  const params = {
    email: email,
    password: password,
  };

  try {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await axios.post(`${BASE_URL}/api/v1/login`, params);

    const validatedResponse = await Utils(response, axios.post, [params], navigate);

    if (validatedResponse.status === 200) {
      setError(null);
      const newToken = response.headers['authorization'];
      const newRefreshToken = response.headers['authorization-refresh'];
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      console.log('login token', newToken, newRefreshToken);
      
      // 토큰 저장이 완료된 후에 navigate 호출
      navigate('/home');
    }
  } catch (err) {
    console.error('Error:', err);

    if (err.response) {
      setError(err.response.data); // 서버에서 제공하는 오류 메시지를 설정
    } else if (err.request) {
      setError('서버로부터 응답을 받지 못했습니다.');
    } else {
      setError('요청을 설정하는 중 오류가 발생했습니다.');
    }
  }
};

  return (
    <Container>
      <LoginHeader isRightButtonEnabled={!!isAllValid} onCompleteClick={handleLogin} />
      <LoginHeaderMargin />
      <SignupTextComponent text="email" value={email} onChange={handleEmailChange} placeholder="ex) weeth@gmail.com" type="text" children='' />
      <TextMargin />
      <SignupTextComponent
        text="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder=""
        type={passwordVisible ? 'text' : 'password'}
      >
        {passwordVisible ? (
          <ToggleVisibleIcon
            alt=""
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ) : (
          <ToggleInvisibleIcon
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
      <ErrorMessage>
        {error}
      </ErrorMessage>
      
    </Container>
  );
};

export default Login;
