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
  padding-left: 10px;

  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.gray[18]};
  color: #fff;

  font-family: ${theme.font.regular};
  font-size: 16px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    font-family: ${theme.font.regular};
  }
`;

const NoEdit = styled(Input).attrs({ readOnly: true })`
  color: ${theme.color.gray[65]};
`;

const InfoInput = ({
  text,
  origValue,
  editValue = () => {},
}: {
  text: string;
  origValue: string | number[];
  editValue?: (val: string | number) => void;
}) => {
  const [value, setValue] = useState(origValue);

  let inputType;
  switch (text) {
    case '핸드폰':
    case '학번':
      inputType = 'number';
      break;
    case '메일':
      inputType = 'no-korean';
      break;
    case '이름':
      inputType = 'korean-english';
      break;
    default:
      inputType = 'text';
  }

  /*
    아래 정규식은 사용자 입력을 제한하기 위함.
    최소치는 저장 버튼을 눌렀을 시에 다시한번 유효성 검사를 진행
  */
  const validateValue = (val: string): boolean => {
    if (val === '') return true;
    const numberRegex = /^[0-9]*$/;
    const koreanRegex = /^[ㄱ-ㅎ가-힣]*$/;
    const koreanEnglishRegex = /^[가-힣a-zA-Z]+$/;

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
      case 'korean-english':
        return koreanEnglishRegex.test(val) && val.length <= 5;
      case 'no-korean':
        return !koreanRegex.test(val);
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
      {text === '로그인' || text === '기수' || text === '역할' ? (
        <NoEdit
          value={value as string}
          onChange={onChangeValue}
          type={inputType}
        />
      ) : (
        <Input
          value={value as string}
          onChange={onChangeValue}
          type={inputType}
        />
      )}
    </Container>
  );
};

export default InfoInput;
