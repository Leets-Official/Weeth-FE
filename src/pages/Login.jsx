import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

const ToggleVisibilityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);

  const validateEmail = (email) => email.includes('@');

  useEffect(() => {
    setIsCompleteEnabled(validateEmail(email) && password.length >= 5);
  }, [email, password]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCompleteClick = () => {
    if (isCompleteEnabled) {
      navigate('/home');
    }
  };

  return (
    <Container>
      <LoginHeader 
        isRightButtonEnabled={isCompleteEnabled} 
        onCompleteClick={handleCompleteClick}
      />
      <LoginHeaderMargin />
      <SignupTextComponent
        text="ID"
        value={email}
        onChange={handleEmailChange}
        placeholder="ex) weeth@gmail.com"
      />
      <TextMargin />
      <SignupTextComponent
        text="PW"
        value={password}
        onChange={handlePasswordChange}
        placeholder=""
        type={passwordVisible ? 'text' : 'password'}
      >
        <ToggleVisibilityButton onClick={togglePasswordVisibility}>
          {passwordVisible ? <ToggleVisibleIcon /> : <ToggleInvisibleIcon />}
        </ToggleVisibilityButton>
      </SignupTextComponent>
    </Container>
  );
};

export default Login;
