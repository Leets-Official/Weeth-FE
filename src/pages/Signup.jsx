import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';

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
  margin-right: 7%;
  text-align: right;
  background: none;
  border: none;
  color: ${props => props.checked ? (props.isDuplicate ? props.theme.color.main.Negative : props.theme.color.main.Positive) : '#508fff'};
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
`;

const ToggleVisibilityButton = styled.button`
  width: 6%;
  height: 22px;
  padding: 1px 0;
  background: none;
  border: none;
  color: white;
  margin-left: 10px;
  cursor: pointer;

  i, svg {
    color: white;
    fill: white;
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

  const currentState = pageStates[page];
  const { email, password, isChecked, nextClicked, emailStatus } = currentState;

  const checkDuplicate = (email) => {
    const existingEmails = ['weetha123@gmail.com', 'test@naver.com'];
    return existingEmails.includes(email);
  };

  const handleCheckEmail = () => {
    const isDuplicate = checkDuplicate(email);
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], emailStatus: isDuplicate ? 'duplicate' : 'available', isChecked: true };
      return newState;
    });
  };

  const handleNextClick = () => {
    if (page === 1) {
      navi('/profile');
    } else {
      setPageStates(prev => [...prev, { email, password, isChecked: false, nextClicked: true, emailStatus: null }]);
      setPage(prevPage => prevPage + 1);
      setHeaderHeight(208);
    }
  };

  const handlePrevClick = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
      setPageStates(prev => prev.slice(0, -1));
      setHeaderHeight(228);
    } else {
      navi(-1);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], email: e.target.value };
      return newState;
    });
  };

  const handlePasswordChange = (e) => {
    setPageStates(prev => {
      const newState = [...prev];
      newState[page] = { ...newState[page], password: e.target.value };
      return newState;
    });
  };

  return (
    <Container>
      <SignupHeader
        onClickLeftButton={handlePrevClick}
        isRightButtonEnabled={isChecked}
        onClickTextButton={handleNextClick}
        nextButtonText={page === 0 ? "다음" : "완료"}
        page={page}
      />
      <HeaderMargin height={headerHeight} />
      <SignupTextComponent
        text="ID로 사용할 메일을 적어주세요"
        value={email}
        placeholder="ex) weeth@gmail.com"
        onChange={handleEmailChange}
      />
      {!nextClicked && !isChecked && (
        <CheckButton onClick={handleCheckEmail} underline>
          가입 여부 확인
        </CheckButton>
      )}
      {!nextClicked && isChecked && (
        <CheckButton isDuplicate={emailStatus === 'duplicate'}>
          {emailStatus === 'duplicate' ? '이미 가입된 ID입니다' : '사용 가능한 ID입니다'}
        </CheckButton>
      )}
      {nextClicked && (
        <>
          <SignupTextComponent
            text="사용할 비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            placeholder=""
            type={passwordVisible ? 'text' : 'password'}
          />
          <ToggleVisibilityButton onClick={togglePasswordVisibility} />
        </>
      )}
    </Container>
  );
};

export default Signup;
