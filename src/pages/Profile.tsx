/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropdownMenu from '@/components/Button/DropdownMenu';
import Header from '@/components/Header/Header';
import PositionSector from '@/components/Signup/PositionSector';
import SignupMemInput from '@/components/Signup/SignupMemInput';
import useCustomBack from '@/hooks/useCustomBack';
import api from '@/api/api';
import SelectModal from '@/components/Modal/SelectModal';

// Styled components
const ProfileContainer = styled.div`
  width: 370px;
  height: 812px;
  max-width: 370px;
  overflow-x: hidden; /* Prevent horizontal scroll */
`;

const ProfileTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  margin-left: 7%;
  margin-top: 30px;
`;

const ProfileSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  margin-left: 7%;
`;

const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ProfileButton = styled.button<{ disabled: boolean }>`
  width: 315px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? '#4D4D4D' : '#00dda8'};
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  margin-top: 100px;
  border: none;
  cursor: ${(props: { disabled: boolean }) =>
    props.disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const InputWrapper = styled.div`
  margin-bottom: 33px; /* Spacing between elements */
`;

const roleMapping: Record<string, string> = {
  FE: 'FE',
  BE: 'BE',
  DE: 'D',
  PM: 'PM',
};

// Member info state type
interface MemberInfo {
  name?: string;
  studentId?: string;
  department?: string;
  tel?: string;
  cardinal?: string;
  position?: string;
  email?: string;
}

// Define a type for the valid keys of MemberInfo
type MemberInfoKeys = keyof MemberInfo;

const Profile: React.FC = () => {
  useCustomBack('/accountcheck');

  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    name: '',
    studentId: '',
    department: '',
    tel: '',
    cardinal: '',
    position: '',
    email: '',
  });
  const [isNextEnabled, setIsNextEnabled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  // useEffect(() => {
  //   const kakaoId = localStorage.getItem('kakaoId');
  //   if (!kakaoId) {
  //     navigate('/');
  //   }
  // }, []);

  const validateEmail = (validEmail: string): boolean => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|net|org|edu|ac\.kr|co\.kr|go\.kr|or\.kr|kakao\.com)$/;
    return emailRegex.test(validEmail);
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleNextClick = async () => {
    const allFieldsFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
      'email',
    ].every(
      (field) =>
        typeof memberInfo[field as keyof MemberInfo] === 'string' &&
        memberInfo[field as keyof MemberInfo]?.trim() !== '',
    );

    if (memberInfo.studentId && memberInfo.studentId.trim().length < 9) {
      showModal('올바른 학번을 입력해 주세요.');
      return;
    }
    if (memberInfo.tel && memberInfo.tel.trim().length < 11) {
      showModal('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }
    if ((memberInfo.email && validateEmail(memberInfo.email)) === false) {
      showModal('올바른 이메일을 입력해 주세요.');
      return;
    }

    if (!allFieldsFilled) {
      showModal('모든 항목을 입력해 주세요.');
      return;
    }

    const mappedMemberInfo = {
      kakaoId: Number(localStorage.getItem('kakaoId')),
      ...memberInfo,
      cardinal: Number(memberInfo.cardinal),
      position: roleMapping[memberInfo.position || ''] || memberInfo.position,
    };

    try {
      const response = await api.post(
        `/api/v1/users/kakao/register`,
        mappedMemberInfo,
      );
      if (response.data.code === 200) {
        showModal(`가입 신청이 완료되었습니다.
        운영진의 승인 후 서비스 이용이 가능합니다.`);
        navigate('/register-success');
      } else {
        showModal(response.data.message);
      }
    } catch (error: any) {
      showModal(error.response?.data.message || error.message);
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
      'email',
    ].every(
      (field) =>
        typeof newMemberInfo[field as keyof MemberInfo] === 'string' &&
        newMemberInfo[field as keyof MemberInfo]?.trim() !== '',
    );

    setIsNextEnabled(allFieldsFilled);
  };

  return (
    <ProfileContainer>
      <Header isAccessible isComplete={isNextEnabled} RightButtonType="none" />
      <ProfileTitle>회원 정보 입력하기</ProfileTitle>
      <ProfileSubTitle>신규 회원님의 정보를 입력해주세요.</ProfileSubTitle>
      <ProfileSubTitle>
        작성이 완료되면 <span style={{ margin: '0 2px' }} />
        <p style={{ color: '#508FFF', margin: 0 }}>
          승인 후 서비스 이용이 가능
        </p>
        합니다.
      </ProfileSubTitle>
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
            type="signup"
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
            labelName="이메일"
            placeholderText="aaa123@example.com"
            origValue={memberInfo.email || ''}
            inputType="email"
            onChange={(value) => handleChange('email', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="기수"
            placeholderText="5"
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
      <ProfileButtonContainer>
        <ProfileButton onClick={handleNextClick} disabled={!isNextEnabled}>
          작성 완료
        </ProfileButton>
      </ProfileButtonContainer>
      {modalVisible && (
        <SelectModal
          title="알림"
          content={modalMessage}
          onClose={() => setModalVisible(false)}
          type="positive"
          visibility={false}
          cancleText="닫기"
        />
      )}
    </ProfileContainer>
  );
};

export default Profile;
