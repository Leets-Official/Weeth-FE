/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import theme from '../styles/theme';
import SignupMemInput from '../components/Signup/SignupMemInput';
import SignupHeader from '../components/Signup/SignupHeader';
import RoleSector from '../components/Signup/RoleSector';
import SignupDropDown from '../components/SignupDropDown';

const ProfileContainer = styled.div`
  width: 370px;
  max-width: 370px;
  overflow-x: hidden; /* 가로 스크롤 삭제 */
`;

const HeaderText = styled.div`
  display: flex;
  margin: 110px 0 0 7%;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const InputScrollContainer = styled.div`
  margin-top: 50px;
  /* Hide scrollbar for Webkit browsers */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const InputWrapper = styled.div`
  margin-bottom: 33px;
`;

const fieldDefinitions = [
  { key: 'name', labelName: '이름', placeholderText: '홍길동' },
  { key: 'studentId', labelName: '학번', placeholderText: '202412345' },
  {
    key: 'department',
    labelName: '학과',
    placeholderText: '정확한 명칭을 적어주세요',
    type: 'dropdown', // Add type to specify dropdown
  },
  { key: 'tel', labelName: '핸드폰', placeholderText: '01012341234' },
  { key: 'cardinal', labelName: '기수', placeholderText: '3' },
  { key: 'position', labelName: '역할', placeholderText: '' },
];

const roleMapping = {
  프론트: 'FE',
  백: 'BE',
  디자인: 'D',
};

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || { email: '', password: '' };

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [memberInfo, setMemberInfo] = useState({ email, password });
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [currentFieldIndex]);

  const handleNextClick = async () => {
    if (currentFieldIndex < fieldDefinitions.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
      setIsNextEnabled(false);
    } else {
      const allFieldsFilled = fieldDefinitions.every(
        (field) =>
          typeof memberInfo[field.key] === 'string' &&
          memberInfo[field.key].trim() !== '',
      );

      if (!allFieldsFilled) {
        alert('입력되지 않은 값이 있습니다.');
        return;
      }

      const mappedMemberInfo = {
        ...memberInfo,
        position: roleMapping[memberInfo.position] || memberInfo.position, // Map the role value
      };
      try {
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/apply`,
          mappedMemberInfo,
        );

        if (response.data.code === 200) {
          navigate('/');
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } catch (error) {
        alert(error.response?.data.message || error.message);
        console.error(
          'Error submitting form:',
          error.response?.data || error.message,
        );
      }
    }
  };

  const handleChange = (key, value) => {
    const newMemberInfo = { ...memberInfo, [key]: value };
    setMemberInfo(newMemberInfo);

    const allFieldsFilled = fieldDefinitions
      .slice(0, currentFieldIndex + 1)
      .every(
        (field) =>
          typeof newMemberInfo[field.key] === 'string' &&
          newMemberInfo[field.key].trim() !== '',
      );

    setIsNextEnabled(allFieldsFilled);
  };

  const getNextButtonColor = () => {
    return isNextEnabled ? 'green' : 'white';
  };

  return (
    <ProfileContainer>
      <SignupHeader
        isRightButtonEnabled={isNextEnabled}
        onClickTextButton={handleNextClick}
        nextButtonColor={getNextButtonColor()}
        page={currentFieldIndex}
      />
      <HeaderText>동아리원의 정보를 입력해주세요.</HeaderText>
      <InputScrollContainer ref={scrollContainerRef}>
        {fieldDefinitions.map((field) => (
          <InputWrapper key={field.key}>
            {field.type === 'dropdown' ? (
              <SignupDropDown
                text={field.labelName}
                origValue={memberInfo[field.key] || ''}
                editValue={(value) => handleChange(field.key, value)}
              />
            ) : field.key === 'position' ? (
              <RoleSector
                labelName={field.labelName}
                value={memberInfo[field.key] || ''}
                onChange={(value) => handleChange(field.key, value)}
              />
            ) : (
              <SignupMemInput
                labelName={field.labelName}
                placeholderText={field.placeholderText}
                value={memberInfo[field.key] || ''}
                onChange={(value) => handleChange(field.key, value)}
              />
            )}
          </InputWrapper>
        ))}
      </InputScrollContainer>
    </ProfileContainer>
  );
};

export default Profile;
