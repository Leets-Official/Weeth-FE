import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import SignupMemInput from '../components/Signup/SignupMemInput';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupWhite from '../components/Signup/SignupWhite';
import RoleSector from '../components/Signup/RoleSector'; // RoleSector import 추가

const ProfileContainer = styled.div`
  width: 370px;
  max-width: 370px;
  height: 810px;
  overflow-x: hidden; /* 가로 스크롤 삭제 */
`;

const MemText = styled.div`
  margin: ${({ marginTop }) => marginTop}px 33% 50px 7%;
  font-size: 18px;
  line-height: 19.09px;
`;

const InputScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 삭제 */
  padding-right: 10px;
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
  },
  { key: 'phone', labelName: '핸드폰', placeholderText: '01012341234' },
  { key: 'generation', labelName: '기수', placeholderText: '3' },
  { key: 'role', labelName: '역할', placeholderText: '' }, // 역할 추가
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || { email: '', password: '' };
  // eslint-disable-next-line no-console
  console.log(email, password);

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [memberInfo, setMemberInfo] = useState({ email, password });
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [marginTop, setMarginTop] = useState(214);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const newMarginTop = Math.max(50, 214 - currentFieldIndex * 20); // 간격 줄이기
    setMarginTop(newMarginTop);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [currentFieldIndex]);

  const handleNextClick = () => {
    if (currentFieldIndex < fieldDefinitions.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
      setIsNextClicked(true);
      setIsNextEnabled(false);
    } else {
      // eslint-disable-next-line no-console
      console.log('모든 정보가 입력되었습니다:', memberInfo);
      setIsNextClicked(true);
      navigate('/');
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

  const handlePrevClick = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
      setIsNextClicked(false);
    }
  };

  const getNextButtonColor = () => {
    return isNextClicked || isNextEnabled ? 'green' : 'white';
  };

  return (
    <ProfileContainer>
      <SignupHeader
        onClickLeftButton={handlePrevClick}
        isRightButtonEnabled={isNextEnabled}
        onClickTextButton={handleNextClick}
        nextButtonText={
          currentFieldIndex < fieldDefinitions.length - 1 ? '다음' : '완료'
        } // 버튼 텍스트 변경
        nextButtonColor={getNextButtonColor()}
        page={currentFieldIndex}
      />
      <MemText marginTop={marginTop}>
        <SignupWhite text="동아리원의 정보를 입력해주세요" />
      </MemText>
      <InputScrollContainer ref={scrollContainerRef}>
        {fieldDefinitions.slice(0, currentFieldIndex + 1).map((field) => (
          <InputWrapper key={field.key}>
            {field.key === 'role' ? (
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
