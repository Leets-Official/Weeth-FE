import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/Login/LoginHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import { ReactComponent as ToggleVisibleIcon } from '../assets/images/ic_toggleVisible.svg';
import { ReactComponent as ToggleInvisibleIcon } from '../assets/images/ic_toggleInvisible.svg';

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

const Login = () => {
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
      const response = await axios.post('http://13.125.78.31:8080/login', params, { withCredentials: true });

      console.log('Response:', response); // 전체 응답을 출력하여 디버깅
      console.log('Response Headers:', response.header); // 응답 헤더를 출력하여 디버깅

      if (response.status === 200) {
        const token = response.header.get['authorization'];
        const refreshToken = response.header.get['authorization-refresh'];

        console.log('Access Token:', token);  // 콘솔에 출력하여 확인
        console.log('Refresh Token:', refreshToken);  // 콘솔에 출력하여 확인

        if (token && refreshToken) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          setError(null);
          navigate('/home'); // 로그인 성공 후 원하는 경로로 이동
        } else {
          setError('토큰이 응답에 포함되지 않았습니다.');
        }
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Container>
  );
};

export default Login;
