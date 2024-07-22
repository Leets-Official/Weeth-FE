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
  padding-top: 0; /* 상단 여백 제거. */
`;

const HeaderMargin = styled.div`
  height: ${props => props.height}px;
`;

const TextMargin = styled.div`
  margin-bottom: 30px;
`;

const InputMargin = styled.div`
  margin-bottom: 15px;
`;
const CheckButton = styled.button`
  margin-top: 15px;
  margin-right: 7%;  // 수정된 부분
  margin-top: 0;
  text-align: right;
  background: none;
  border: none;
  color: ${props => props.checked ? (props.isDuplicate ? <props className="theme color main Negative"></props> : props.theme.color.main.Positive) : '#508fff'};
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
  color: white; /* 나중에 theme */
  margin-left: 10px;
  cursor: pointer;

  i, svg {
    color: white;
    fill: white;
  }
`;


const Signup = () => {
  const navi = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState(null); // null:초기 상태, 'duplicate': 중복, 'available': 사용 가능
  const [isChecked, setIsChecked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [page, setPage] = useState(0); 
  const [headerHeight, setHeaderHeight] = useState(228);

  const checkDuplicate = (email) => {
    const existingEmails = ['weetha123@gmail.com', 'test@naver.com'];
    return existingEmails.includes(email);
  };

  const handleCheckEmail = () => {
    const isDuplicate = checkDuplicate(email);
    setEmailStatus(isDuplicate ? 'duplicate' : 'available');
    setIsChecked(true);
  };

  const handleNextClick = () => {
    if (page === 1) {
      // Perform any necessary final actions before navigation
      navi('/profile'); // Navigate to the next page
    } else {
      setNextClicked(true);
      setHeaderHeight(208);
      setPage(1);
    }
  };

  const handlePrevClick = () => {
    console.log('이전 페이지로 이동');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container>
      <SignupHeader
        onClickLeftButton={handlePrevClick}
        isRightButtonEnabled={isChecked}
        onClickTextButton={handleNextClick}
        nextButtonText={page === 0 ? "다음" : "완료"}  // 추가된 부분
        page={page}
        setPage={setPage} // Pass setPage as a prop
      />
      <HeaderMargin height={headerHeight} />
      <SignupTextComponent
        text="ID로 사용할 메일을 적어주세요"
        value={email}
        placeholder="ex) weeth@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputMargin />
      {!nextClicked && !isChecked && (
    <CheckButton onClick={handleCheckEmail} underline>
      가입 여부 확인
    </CheckButton>
  )}
    {!nextClicked && isChecked && (
        <CheckButton isDuplicate={emailStatus === 'duplicate'}>
          {emailStatus === 'duplicate' ? (
            '이미 가입된 ID입니다'
          ) : (
            '사용 가능한 ID입니다'
          )}
        </CheckButton>
      )}
      {nextClicked && (
        <>
          <SignupTextComponent
            text="사용할 비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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