import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SignupWhite from './SignupWhite';
import theme from '../../styles/theme';

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
    font-family: ${theme.font.family.pretendard_regular};
  }
`;

const SignupMemInput = ({
  labelName,
  placeholderText,
  origValue,
  inputType,
  onChange,
}) => {
  const [value, setValue] = useState(origValue);

  const validateValue = (val) => {
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
      default:
        return true;
    }
  };

  const onChangeValue = (e) => {
    const val = e.target.value;
    if (validateValue(val)) {
      setValue(val); // 로컬 상태 업데이트
      onChange(val); // 부모 컴포넌트로 상태 전달
    }
  };

  useEffect(() => {
    setValue(origValue); // origValue 변경 시 로컬 상태 업데이트
  }, [origValue]);

  return (
    <MemTextContainer>
      <Label>
        <SignupWhite text={labelName} />
      </Label>
      <InputLine
        placeholder={placeholderText}
        value={value}
        onChange={onChangeValue}
      />
    </MemTextContainer>
  );
};

SignupMemInput.propTypes = {
  labelName: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  origValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  inputType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, // 부모 컴포넌트로 상태 전달
};

export default SignupMemInput;
