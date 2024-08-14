import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import { ReactComponent as ToggleVisibleIcon } from '../assets/images/ic_toggleVisible.svg';
import { ReactComponent as ToggleInvisibleIcon } from '../assets/images/ic_toggleInvisible.svg';
import theme from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const InputContainer = styled.div`
  margin-top: 15px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CheckButton = styled.button`
  margin: 10px 6% 30px 0;
  background: none;
  border: none;
  color: ${theme.color.main.positive};
  font-family: ${theme.font.family.pretendard_semiBold};
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const Signup = () => {
  const navi = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (vaildEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(vaildEmail);
  };

  const checkDuplicate = async (DuplicatedEmail) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(
        `${BASE_URL}/api/v1/users/email?email=${DuplicatedEmail}`,
        {},
      );
      return response.data.code === 200;
    } catch (error) {
      if (error.response && error.response.data.code === 400) {
        return false; // Email is duplicate
      }
      console.error('An error occurred:', error);
      return null;
    }
  };

  const handleCheckEmail = async () => {
    if (!validateEmail(email)) {
      alert('유효한 이메일 형식을 입력해주세요.');
      return;
    }
    const isDuplicate = await checkDuplicate(email);
    setEmailStatus(isDuplicate ? 'available' : 'duplicate');
  };

  const handleNextClick = () => {
    if (!validateEmail(email)) {
      alert('유효한 이메일 형식을 입력해주세요.');
      return;
    }

    if (emailStatus === 'duplicate') {
      alert('이메일을 다시 확인해 주세요.');
      return;
    }

    if (password.trim() === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    navi('/profile');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
    setEmail(emailValue);
    setEmailStatus(emailValue ? emailStatus : null);
  };

  const handlePasswordChange = (e) => {
    const pwValue = e.target.value.replace(
      /[~!@#$%";'^,&*()_+|</>=>`?:{}]/g,
      '',
    );
    setPassword(pwValue);
  };

  const getNextButtonColor = () => {
    if (
      !validateEmail(email) ||
      emailStatus === 'duplicate' ||
      password.trim() === ''
    ) {
      return 'white';
    }
    return 'green';
  };

  return (
    <Container>
      <SignupHeader
        isRightButtonEnabled={
          validateEmail(email) &&
          emailStatus !== 'duplicate' &&
          password.trim() !== ''
        }
        onClickTextButton={handleNextClick}
        nextButtonColor={getNextButtonColor()}
      />
      <InputContainer>
        <SignupTextComponent
          text="ID로 사용할 메일을 적어주세요"
          value={email}
          onChange={handleEmailChange}
          placeholder="ex) weeth@gmail.com"
          type=""
        />
        <ButtonContainer>
          <CheckButton
            onClick={handleCheckEmail}
            underline
            disabled={!email || !validateEmail(email)}
          >
            가입 여부 확인
          </CheckButton>
        </ButtonContainer>
        <SignupTextComponent
          text="사용할 비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
          placeholder=""
          type={passwordVisible ? 'text' : 'password'}
        >
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? <ToggleVisibleIcon /> : <ToggleInvisibleIcon />}
          </ToggleVisibilityButton>
        </SignupTextComponent>
      </InputContainer>
    </Container>
  );
};

export default Signup;
