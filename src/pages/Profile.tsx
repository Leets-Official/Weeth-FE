/* eslint-disable no-alert */
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropdownMenu from '@/components/Button/DropdownMenu';
import Header from '@/components/Header/Header';
import PositionSector from '@/components/Signup/PositionSector';
import SignupMemInput from '@/components/Signup/SignupMemInput';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';

// Styled components
const ProfileContainer = styled.div`
  width: 370px;
  height: 812px;
  max-width: 370px;
  overflow-x: hidden; /* Prevent horizontal scroll */
`;

const HeaderText = styled.div`
  display: flex;
  margin: 110px 0 0 7%;
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

const InputContainer = styled.div`
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  margin-bottom: 33px; /* Spacing between elements */
`;

const roleMapping: Record<string, string> = {
  프론트: 'FE',
  백: 'BE',
  디자인: 'D',
};

// Member info state type
interface MemberInfo {
  email?: string;
  password?: string;
  name?: string;
  studentId?: string;
  department?: string;
  tel?: string;
  cardinal?: string;
  position?: string;
}

// Define a type for the valid keys of MemberInfo
type MemberInfoKeys = keyof MemberInfo;

const Profile: React.FC = () => {
  useCustomBack('/signup');

  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || { email: '', password: '' };

  const [memberInfo, setMemberInfo] = useState<MemberInfo>({ email, password });
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);

  const handleNextClick = async () => {
    const allFieldsFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
    ].every(
      (field) =>
        typeof memberInfo[field as keyof MemberInfo] === 'string' &&
        memberInfo[field as keyof MemberInfo]?.trim() !== '',
    );

    if (memberInfo.studentId && memberInfo.studentId.trim().length < 9) {
      alert('올바른 학번을 입력해 주세요.');
      return;
    }
    if (memberInfo.tel && memberInfo.tel.trim().length < 11) {
      alert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }

    if (!allFieldsFilled) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    const mappedMemberInfo = {
      ...memberInfo,
      position: roleMapping[memberInfo.position || ''] || memberInfo.position,
    };

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/apply`,
        mappedMemberInfo,
      );

      if (response.data.code === 200) {
        alert(`가입 신청이 완료되었습니다.
        운영진의 승인 후 서비스 이용이 가능합니다.`);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      alert(error.response?.data.message || error.message);
    }
  };

  const handleChange = (key: MemberInfoKeys, value: string) => {
    const newMemberInfo = { ...memberInfo, [key]: value };
    setMemberInfo(newMemberInfo);

    const allFieldsFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
    ].every(
      (field) =>
        typeof newMemberInfo[field as keyof MemberInfo] === 'string' &&
        newMemberInfo[field as keyof MemberInfo]?.trim() !== '',
    );

    setIsNextEnabled(allFieldsFilled);
  };

  return (
    <ProfileContainer>
      <Header
        isComplete={isNextEnabled}
        onClickRightButton={handleNextClick}
        RightButtonType="TEXT"
      />
      <HeaderText>동아리원의 정보를 입력해주세요.</HeaderText>
      <InputContainer>
        <InputWrapper>
          <SignupMemInput
            labelName="이름"
            placeholderText="홍길동"
            origValue={memberInfo.name || ''}
            inputType="text"
            onChange={(value) => handleChange('name', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="학번"
            placeholderText="202412345"
            origValue={memberInfo.studentId || ''}
            inputType="number"
            onChange={(value) => handleChange('studentId', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <DropdownMenu
            text="학과"
            origValue={memberInfo.department || ''}
            editValue={(value) => handleChange('department', value)}
            buttonstyle="signup"
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="핸드폰"
            placeholderText="01012341234"
            origValue={memberInfo.tel || ''}
            inputType="number"
            onChange={(value) => handleChange('tel', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="기수"
            placeholderText="4"
            origValue={memberInfo.cardinal || ''}
            inputType="number"
            onChange={(value) => handleChange('cardinal', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <PositionSector
            labelName="역할"
            value={memberInfo.position || ''}
            onChange={(value) => handleChange('position', value)}
          />
        </InputWrapper>
      </InputContainer>
    </ProfileContainer>
  );
};

export default Profile;
