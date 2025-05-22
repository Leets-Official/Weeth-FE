/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DropdownMenu from '@/components/Button/DropdownMenu';
import Header from '@/components/Header/Header';
import PositionSector from '@/components/Signup/PositionSector';
import useCustomBack from '@/hooks/useCustomBack';
import api from '@/api/api';
import SelectModal from '@/components/Modal/SelectModal';
import theme from '@/styles/theme';
import Line from '@/components/common/Line';
import InfoInput from '@/components/MyPage/InfoInput';

const ProfileContainer = styled.div`
  width: 370px;
  max-width: 370px;
  overflow-x: hidden;
  margin-bottom: 70px;
`;

const ProfileTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  margin-left: 7%;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const ProfileSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  margin-left: 7%;
  color: #a6a6a6;
`;

const ProfileButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
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
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div``;

const Text = styled.div`
  font-size: 20px;
  font-family: ${theme.font.semiBold};
  margin: 24px 0 10px 25px;
  color: #a6a6a6;
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content>
      <Text>{children}</Text>
      <Line />
    </Content>
  );
};

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

  const validatePhone = (tel: string): boolean => /^\d{10,11}$/.test(tel);

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

    if (!/^\d{9}$/.test(memberInfo.studentId || '')) {
      showModal('올바른 학번을 입력해 주세요.');
      return;
    }
    if (!validatePhone(memberInfo.tel || '')) {
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
        navigate('/register-success', { replace: true });
      } else {
        showModal(response.data.message);
      }
    } catch (error: any) {
      showModal(error.response?.data.message || error.message);
    }
  };

  const handleChange = (key: MemberInfoKeys, value: string | number) => {
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
        <InfoWrapper>
          <Title>개인정보</Title>
          <InfoInput
            isProfile
            text="이름"
            origValue={memberInfo.name || ''}
            editValue={(value) => handleChange('name', value)}
          />
          <InfoInput
            isProfile
            text="핸드폰"
            origValue={memberInfo.tel || ''}
            editValue={(value) => handleChange('tel', value)}
          />
          <InfoInput
            isProfile
            text="메일"
            origValue={memberInfo.email || ''}
            editValue={(value) => handleChange('email', value)}
          />

          <Title>활동정보</Title>
          <DropdownMenu
            isProfile
            text="학과"
            origValue={memberInfo.department || ''}
            editValue={(value) => handleChange('department', value)}
            type="mypage"
          />
          <InfoInput
            isProfile
            text="학번"
            origValue={memberInfo.studentId || ''}
            editValue={(value) => handleChange('studentId', value)}
          />
          <DropdownMenu
            isProfile
            isCardinal
            text="기수"
            origValue={memberInfo.cardinal || ''}
            editValue={(value) => handleChange('cardinal', value)}
            type="mypage"
          />
          <PositionSector
            labelName="역할"
            value={memberInfo.position || ''}
            onChange={(value) => handleChange('position', value)}
          />
        </InfoWrapper>
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
