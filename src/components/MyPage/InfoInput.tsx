import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import icVisible from '../../assets/images/ic_toggleVisible.svg';
import icInvisible from '../../assets/images/ic_toggleInvisible.svg';

interface InfoInputProps {
  text?: string;
  origValue: string | number[];
  editValue: (val: string) => void;
  placeholder?: string;
  width?: string;
  padding: string;
  align: string;
  edit?: boolean;
  inputType?: 'text' | 'number' | 'no-korean' | 'eng-num';
}

const StyledInfoInput = styled.div<{ $padding: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: ${(props) => props.$padding || '0px'};
  padding-right: ${(props) => props.$padding || '0px'};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const Input = styled.input<{ width?: string; $edit?: boolean; align?: string }>`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: ${(props) => (props.$edit ? theme.color.grayScale.gray30 : 'white')};
  text-align: ${(props) => props.align || 'right'};
  padding-left: 10px;
  padding-right: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;

  &::placeholder {
    font-family: ${theme.font.family.pretendard_regular};
  }
`;

const PwInput = styled.input<{ width?: string; align?: string }>`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: white;
  padding-left: 10px;
  padding-right: 43px;
  text-align: ${(props) => props.align || 'right'};
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_regular};

  &::placeholder {
    font-family: ${theme.font.family.pretendard_regular};
  }
`;

const Visible = styled.img`
  position: absolute;
  right: 35px;
  cursor: pointer;
`;

const InfoInput: React.FC<InfoInputProps> = ({
  text,
  origValue,
  editValue,
  placeholder,
  width,
  padding,
  align,
  edit,
  inputType,
}) => {
  const [value, setValue] = useState(origValue);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateValue = (val: string): boolean => {
    if (val === '') return true;
    const numberRegex = /^[0-9]*$/;
    const koreanRegex = /^[ㄱ-ㅎ가-힣]*$/;
    const engNumRegex = /^[a-zA-Z0-9]*$/;

    switch (inputType) {
      case 'text':
        return koreanRegex.test(val) && val.length <= 5;
      case 'number':
        if (text === '학번') {
          return numberRegex.test(val) && val.length <= 9;
        }
        if (text === '핸드폰') {
          return numberRegex.test(val) && val.length <= 11;
        }
        return numberRegex.test(val);
      case 'no-korean':
        return !koreanRegex.test(val);
      case 'eng-num':
        return engNumRegex.test(val);
      default:
        return true;
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (validateValue(val)) {
      setValue(val);
      editValue(val);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  if (text === '비밀번호') {
    return (
      <StyledInfoInput $padding={padding}>
        <div>{text}</div>
        <PwInput
          placeholder={placeholder}
          value={value as string}
          onChange={onChangeValue}
          width={width}
          align={align}
          type={passwordVisible ? 'text' : 'password'}
        />
        {passwordVisible ? (
          <Visible
            onClick={togglePasswordVisibility}
            src={icVisible}
            alt="숨김"
          />
        ) : (
          <Visible
            onClick={togglePasswordVisibility}
            src={icInvisible}
            alt="보임"
          />
        )}
      </StyledInfoInput>
    );
  }
  return (
    <StyledInfoInput $padding={padding}>
      <div>{text}</div>
      <Input
        placeholder={placeholder}
        value={value as string}
        onChange={onChangeValue}
        width={width}
        align={align}
        $edit={edit}
        type={inputType === 'number' ? 'text' : inputType}
      />
    </StyledInfoInput>
  );
};

export default InfoInput;