import { useState, useEffect } from 'react';
import icVisible from '@/assets/images/ic_toggleVisible.svg';
import icInvisible from '@/assets/images/ic_toggleInvisible.svg';
import * as S from '@/styles/mypage/InfoInput.styled';

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
      <S.StyledInfoInput $padding={padding}>
        <div>{text}</div>
        <S.PwInput
          placeholder={placeholder}
          value={value as string}
          onChange={onChangeValue}
          width={width}
          align={align}
          type={passwordVisible ? 'text' : 'password'}
        />
        {passwordVisible ? (
          <S.Visible
            onClick={togglePasswordVisibility}
            src={icVisible}
            alt="숨김"
          />
        ) : (
          <S.Visible
            onClick={togglePasswordVisibility}
            src={icInvisible}
            alt="보임"
          />
        )}
      </S.StyledInfoInput>
    );
  }
  return (
    <S.StyledInfoInput $padding={padding}>
      <div>{text}</div>
      <S.Input
        placeholder={placeholder}
        value={value as string}
        onChange={onChangeValue}
        width={width}
        align={align}
        $edit={edit}
        type={inputType === 'number' ? 'text' : inputType}
      />
    </S.StyledInfoInput>
  );
};

export default InfoInput;
