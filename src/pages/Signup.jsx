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

const HeaderMargin = styled.div`
  height: ${props => props.height}px;
`;

const CheckButton = styled.button`
  margin-top: 15px;
  margin-right: 5%;
  text-align: right;
  background: none;
  border: none;
  color: ${props => {
    if (props.checked) {
      return props.isDuplicate ? theme.color.main.negative : theme.color.main.positive;
    }
    return theme.color.main.positive;
  }};
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  &:disabled {
    cursor: not-allowed;
    color: ${theme.color.main.positive};
  }
`;

const WarningText = styled.p`
  color: ${theme.color.main.negative};
  font-size: 12px;
  margin-top: 5px;
  text-align: right;
`;

const TextMargin = styled.div`
  margin-top: 15px;
`;

const InputMargin = styled.div`
  margin-bottom: 15px;
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

const Signup = () => {
  const navi = useNavigate();

  const [page, setPage] = useState(0);
  const [pageStates, setPageStates] = useState([
    { email: '', password: '', isChecked: false, nextClicked: false, emailStatus: null }
  ]);
  const [headerHeight, setHeaderHeight] = useState(228);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');

  const currentState = pageStates[page];
  const { email, password, isChecked, nextClicked, emailStatus } = currentState;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkDuplicate = async (email) => {
    try {
      const response = await axios.get(`http://13.125.78.31:8080/users/duplication/${email}`, {});
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
      setEmailWarning('유효한 이메일 형식을 입력해주세요.');
      return;
    }

    setEmailWarning('');
    const isDuplicate = await checkDuplicate(email);
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], emailStatus: isDuplicate ? 'available' : 'duplicate', isChecked: true };
      return newState;
    });

  };

  const handleNextClick = () => {
    if (page === 0) {
      if (!isChecked) {
        alert('가입 여부를 확인해 주세요.');
        return;
      }

      if (emailStatus === 'duplicate') {
        alert('이메일을 다시 확인해 주세요.');
        return;
      }
    }

    if (page === 1) {
      navi('/profile', { state: { email, password } });
    } else {
      setPageStates(prev => [...prev, { email, password, isChecked: false, nextClicked: true, emailStatus: null }]);
      setPage(prevPage => prevPage + 1);
      setHeaderHeight(208);
    }
  };

  const onClickLeftButton = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
      setPageStates(prev => prev.slice(0, -1));
      setHeaderHeight(228);
    } else {
      navi(-1);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = {
        ...newState[page],
        email: emailValue,
        isChecked: false,
        emailStatus: emailValue ? newState[page].emailStatus : null
      };
      return newState;
    });
    setEmailWarning('');
  };

  const handlePasswordChange = (e) => {
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], password: e.target.value };
      return newState;
    });
  };

  const getNextButtonColor = () => {
    if (page === 0 && (!isChecked || emailStatus === 'duplicate')) {
      return 'white';
    }
    return 'green';
  };

  return (
    <Container>
      <SignupHeader
        onClickLeftButton={onClickLeftButton}
        isRightButtonEnabled={page === 0 ? (isChecked && emailStatus !== 'duplicate') : (password.trim() !== '')}
        onClickTextButton={handleNextClick}
        nextButtonText={page === 0 ? "다음" : "완료"}
        nextButtonColor={getNextButtonColor()}
      />
      <HeaderMargin height={headerHeight} />
      <SignupTextComponent
        text="ID로 사용할 메일을 적어주세요"
        value={email}
        onChange={handleEmailChange}
        placeholder="ex) weeth@gmail.com"
        type=""
        children=""
      />
      {!nextClicked && !isChecked && (
        <>
          <CheckButton onClick={handleCheckEmail} underline disabled={!email || !validateEmail(email)}>
            가입 여부 확인
          </CheckButton>
          {emailWarning && <WarningText>{emailWarning}</WarningText>}
        </>
      )}
      {!nextClicked && isChecked && (
        <CheckButton 
          isDuplicate={emailStatus === 'duplicate'}
          style={{color: emailStatus === 'duplicate' ? theme.color.main.negative : theme.color.main.positive}}>
          {emailStatus === 'duplicate' ? '이미 가입된 ID입니다' : '사용 가능한 ID입니다'}
        </CheckButton>
      )}
      <TextMargin />
      {nextClicked && (
        <>
          <InputMargin />
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
        </>
      )}
    </Container>
  );
};

export default Signup;
