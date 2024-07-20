import React, { useState } from 'react';
import styled from 'styled-components';
import SignupMemInput from '../components/Signup/SignupMemInput';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupWhite from '../components/Signup/SignupWhite';

const MemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 810px;
  max-width: 370px;
`;

const MemText = styled.div`
  margin: 214px 33% 50px 7%; /* tnwjd */
  font-size: 18px;
  line-height: 19.09px;
  margin-bottom: 13%; /* ?
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
];

const Profile = () => {
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [memberInfo, setMemberInfo] = useState({}); /* 입력값 저장 */
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  /* 다음 버튼 활성화 여부 */

  const validateInput = (key, value) => {
    return value && value.trim() !== '';
  };

  const handleNextClick = () => {
    if (currentFieldIndex < fieldDefinitions.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
      setIsNextEnabled(false);
    } else {
      console.log('모든 정보가 입력되었습니다:', memberInfo);
      // 여기에 최종 제출 로직을 추가할 수 있습니다.
    }
  };

  /* 입력 받은 거 업데이트, 저장 중 */
  const handleChange = (key, value) => {
    setMemberInfo({ ...memberInfo, [key]: value });
    setIsNextEnabled(validateInput(key, value)); /* 유효성 */
  };

  const handlePrevClick = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  return (
    <MemContainer>
      <SignupHeader
        onClickLeftButton={handlePrevClick}
        isRightButtonEnabled={isNextEnabled}
        onClickTextButton={handleNextClick}
      />
      <MemText>
        <SignupWhite text="동아리원의 정보를 입력해주세요" />
      </MemText>

      {fieldDefinitions.slice(0, currentFieldIndex + 1).map((field) => (
        <InputWrapper key={field.key}>
          <SignupMemInput
            key={field.key}
            labelName={field.labelName}
            placeholderText={field.placeholderText}
            value={memberInfo[field.key] || ''}
            onChange={(value) => handleChange(field.key, value)}
          />
        </InputWrapper>
      ))}
    </MemContainer>
  );
};

export default Profile;
