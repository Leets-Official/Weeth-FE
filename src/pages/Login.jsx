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

const ErrorMessage = styled.div`
  right: 0;
  color: #ff5858;
  margin: 15px 0 0 -5%;
  font-size: 14px;
  text-align: right;
  width: 100%;

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

      if (response.status === 200) {
        const token = response.headers['authorization'];
        const refreshToken = response.headers['authorization-refresh'];

        if (token && refreshToken) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          setError(null);
          navigate('/home'); // 로그인 성공 후 원하는 경로로 이동
        } else {
          setError('토큰이 응답에 포함되지 않았습니다.');
        }
      }
    } catch (err) {
      console.error('Error:', err);

      if (err.response) {
        // 서버가 응답했지만 상태 코드는 2xx 범위 밖
        setError(err.response.data); // 서버에서 제공하는 오류 메시지를 설정
      } else if (err.request) {
        // 요청이 만들어졌지만 응답을 받지 못함
        setError('서버로부터 응답을 받지 못했습니다.');
      } else {
        // 요청을 설정하는 중에 문제가 발생
        setError('요청을 설정하는 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <LoginHeader isRightButtonEnabled={!!isAllValid} onCompleteClick={handleLogin} />
      <LoginHeaderMargin />
      <SignupTextComponent text="ID" value={email} onChange={handleEmailChange} placeholder="ex) weeth@gmail.com" type="text" children='' />
      <TextMargin />
      <SignupTextComponent
        text="PW"
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
