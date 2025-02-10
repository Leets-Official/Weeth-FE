import { useEffect, useState } from 'react';
import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  font-family: ${theme.font.regular};
  font-size: 16px;
`;

const Label = styled.div`
  width: 42px;
  text-align: left;
  color: ${theme.color.gray[65]};
`;

const Input = styled.input`
  width: 257px;
  height: 45px;
  box-sizing: border-box;
  padding-right: 10px;

  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.gray[18]};
  color: #fff;

  font-family: ${theme.font.regular};
  font-size: 16px;
  text-align: right;

  &::placeholder {
    font-family: ${theme.font.regular};
  }
`;

interface InfoInputProps {
  text?: string;
  origValue: string | number[];
  editValue?: (val: string) => void;
}

const InfoInput: React.FC<InfoInputProps> = ({
  text,
  origValue,
  editValue = () => {},
}) => {
  const [value, setValue] = useState(origValue);

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

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  return (
    <Container>
      <Label>{text}</Label>
      <Input
        value={value as string}
        onChange={onChangeValue}
        // type={inputType === 'number' ? 'text' : inputType}
      />
    </Container>
  );
};

export default InfoInput;
