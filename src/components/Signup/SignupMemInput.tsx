import SignupWhite from '@/components/Signup/SignupWhite';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SignupMemInputProps {
  labelName: string;
  placeholderText: string;
  origValue: string | string[];
  inputType: 'text' | 'number' | 'email';
  onChange: (value: string) => void;
}

const MemTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 370px;
  max-width: 370px;
  margin-bottom: 3px;
`;

const Label = styled.div`
  width: 7%;
  height: 19px;
  margin-left: 10%;
  margin-right: 9%;
  font-size: 16px;
  line-height: 19.09px;
`;

const InputLine = styled.input`
  display: flex;
  width: 58%;
  margin-right: 17%;
  border: none;
  border-bottom: 1px solid #333333;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #333333;
    font-family: ${theme.font.regular};
  }

  /* 숫자 입력 시 화살표 제거 */
  -moz-appearance: textfield; /* Firefox */
  -webkit-appearance: none; /* Chrome, Safari, Opera */
  appearance: none; /* 기본값 제거 */

  /* 화살표 버튼을 숨기기 위한 추가 스타일 (Chrome/Safari에서 유효) */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SignupMemInput: React.FC<SignupMemInputProps> = ({
  labelName,
  placeholderText,
  origValue,
  inputType,
  onChange,
}) => {
  const [value, setValue] = useState<string>(origValue as string);

  const validateValue = (val: string): boolean => {
    const numberRegex = /^[0-9]*$/;
    switch (inputType) {
      case 'text':
        return /^[ㄱ-힣]*$/.test(val) && val.length <= 7; // 한글만, 최대 7자
      case 'number':
        if (labelName === '학번') {
          return numberRegex.test(val) && val.length <= 9; // 숫자만, 최대 9자리
        }
        if (labelName === '핸드폰') {
          return numberRegex.test(val) && val.length <= 11; // 숫자만, 최대 11자리
        }
        if (labelName === '기수') {
          return /^[1-4]*$/.test(val) && val.length <= 1; // 1~4 사이 한자리 숫자
        }
        return numberRegex.test(val);
      case 'email':
        return true;
      default:
        return true;
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (validateValue(val)) {
      setValue(val); // 로컬 상태 업데이트
      onChange(val); // 부모 컴포넌트로 상태 전달
    }
  };

  useEffect(() => {
    setValue(origValue as string); // origValue 변경 시 로컬 상태 업데이트
  }, [origValue]);

  return (
    <MemTextContainer>
      <Label>
        <SignupWhite text={labelName} />
      </Label>
      <InputLine
        type={inputType}
        placeholder={placeholderText}
        value={value}
        onChange={onChangeValue}
      />
    </MemTextContainer>
  );
};

export default SignupMemInput;
