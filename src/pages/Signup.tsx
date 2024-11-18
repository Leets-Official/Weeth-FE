/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupHeader from '@/components/Signup/SignupHeader';
import SignupTextComponent from '@/components/Signup/SignupTextComponent';
import toggleVisibleIcon from '@/assets/images/ic_toggleVisible.svg';
import toggleInvisibleIcon from '@/assets/images/ic_toggleInvisible.svg';
import theme from '@/styles/theme';
import useCustomBack from '@/hooks/useCustomBack';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const InputContainer = styled.div`
  margin-top: 119px;
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
  color: ${theme.color.main.mainColor};
  font-family: ${theme.font.family.pretendard_semiBold};
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const MessageText = styled.span`
  margin: 10px 6% 30px 0;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
`;

const Signup: React.FC = () => {
  useCustomBack('/');

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'available' | 'duplicate' | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const validateEmail = (validEmail: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(validEmail);
  };

  const checkDuplicate = async (DuplicatedEmail: string): Promise<boolean | null> => {
    try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
            `${BASE_URL}/api/v1/users/email?email=${DuplicatedEmail}`
        );

        if (response.data.code === 200) {
            return response.data.data;
        }
    } catch (error: unknown) {
        if (error instanceof axios.AxiosError && error.response?.data.code === 400) {
            return false;
        }
        return null;
    }

    return null;
};


  const handleCheckEmail = async () => {
    if (!validateEmail(email)) {
      alert('올바른 이메일 형식이 아닙니다.');
    } else {
      const isDuplicate = await checkDuplicate(email);
      setEmailStatus(isDuplicate ? 'available' : 'duplicate');
      setIsChecked(true);
    }
  };

  const handleNextClick = () => {
    if (email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }

    if (!isChecked) {
      alert('가입 여부를 확인해 주세요.');
      return;
    }

    if (emailStatus === 'duplicate') {
      return;
    }

    if (password.trim() === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 6 || password.length > 12) {
      alert('비밀번호를 6~12자리로 입력해 주세요.');
      return;
    }
    navigate('/profile', { state: { email, password } });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
    setEmail(emailValue);
    setEmailStatus(null);
    setIsChecked(false); // 이메일이 변경될 때마다 isChecked 상태를 false로 초기화
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(pwValue);
  };

  return (
    <Container>
      <SignupHeader
        isRightButtonEnabled={
          validateEmail(email) &&
          emailStatus !== 'duplicate' &&
          password.trim() !== '' &&
          isChecked &&
          !(password.length < 6 || password.length > 12)
        }
        onClickTextButton={handleNextClick}
      />
      <InputContainer>
        <SignupTextComponent
          text="ID로 사용할 메일을 적어주세요."
          value={email}
          onChange={handleEmailChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleNextClick();
          }}
          placeholder="ex) weeth@gmail.com"
          type=""
        />
        <ButtonContainer>
          {!isChecked && (
            <CheckButton onClick={handleCheckEmail}>가입 여부 확인</CheckButton>
          )}
          {isChecked && (
            <MessageText
              style={{
                color:
                  emailStatus === 'duplicate'
                    ? theme.color.main.negative
                    : theme.color.main.positive,
              }}
            >
              {emailStatus === 'duplicate'
                ? '이미 가입된 ID입니다.'
                : '사용 가능한 ID입니다.'}
            </MessageText>
          )}
        </ButtonContainer>
        <SignupTextComponent
          text="사용할 비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleNextClick();
          }}
          placeholder="6~12자리 / 영문 대소문자, 숫자 조합"
          type={passwordVisible ? 'text' : 'password'}
        >
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? <img src={toggleVisibleIcon} alt="Toggle to visible" /> : <img src={toggleInvisibleIcon} alt="Toggle to invisible" />}
          </ToggleVisibilityButton>
        </SignupTextComponent>
      </InputContainer>
    </Container>
  );
};

export default Signup;
