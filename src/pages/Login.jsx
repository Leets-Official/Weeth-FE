import React, { useState } from 'react';
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
  const navi = useNavigate();

  const [page, setPage] = useState(0);
  const [pageStates, setPageStates] = useState([
    { email: '', password: '', isChecked: false, nextClicked: false, emailStatus: null }
  ]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const currentState = pageStates[page];
  const { email, password, isChecked, nextClicked, emailStatus } = currentState;

  /* 주석 처리는 Signup 부분 기능 복븉 */

  // const checkDuplicate = (email) => {
  //   const existingEmails = ['weetha123@gmail.com', 'test@naver.com'];
  //   return existingEmails.includes(email);
  // };

  // const handleCheckEmail = () => {
  //   const isDuplicate = checkDuplicate(email);
  //   setPageStates(prev => {
  //     const newState = [...prev];
  //     newState[page] = { ...newState[page], emailStatus: isDuplicate ? 'duplicate' : 'available', isChecked: true };
  //     return newState;
  //   });
  // };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  // const handleEmailChange = (e) => {
  //   setPageStates(prev => {
  //     const newState = [...prev];
  //     newState[page] = { ...newState[page], email: e.target.value };
  //     return newState;
  //   });
  // };

  const handlePasswordChange = (e) => {
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], password: e.target.value };
      return newState;
    });
  };

  return (
    <Container>
      <LoginHeader />
      <LoginHeaderMargin />
      <SignupTextComponent
        text="ID"
        value={email}
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
