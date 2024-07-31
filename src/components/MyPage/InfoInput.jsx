/* eslint-disable react/require-default-props */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import icVisible from '../../assets/images/ic_toggleVisible.svg';
import icInvisible from '../../assets/images/ic_toggleInvisible.svg';

const StyledInfoInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: ${(props) => props.padding || '0px'};
  padding-right: ${(props) => props.padding || '0px'};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const Input = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${theme.color.grayScale.gray18};
  color: ${(props) => (props.edit ? theme.color.grayScale.gray30 : 'white')};
  padding-left: 10px;
  padding-right: 10px;
  text-align: ${(props) => props.align || 'right'};
  font-size: 16px;
`;

const PwInput = styled.input`
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
`;

const Visible = styled.div`
  position: absolute;
  right: 35px;
  cursor: pointer;
`;

const InfoInput = ({
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

  const validateValue = (val) => {
    const numberRegex = /^[0-9]*$/;
    switch (inputType) {
      case 'text':
        return /^[가-힣a-zA-Z]*$/.test(val); // 한글/영어만
      case 'number':
        if (text === '학번') {
          return numberRegex.test(val) && val.length <= 9; // 숫자만, 최대 9자리
        }
        if (text === '핸드폰') {
          return numberRegex.test(val) && val.length <= 11; // 숫자만, 최대 11자리
        }
        return numberRegex.test(val);
      case 'password':
        return /^[a-zA-Z0-9!@#$%^&*]*$/.test(val); // 영어/숫자/특수문자만
      default:
        return true;
    }
  };

  const onChangeValue = (e) => {
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
      <StyledInfoInput padding={padding}>
        <div>{text}</div>
        <PwInput
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
          width={width}
          align={align}
          type={passwordVisible ? 'text' : 'password'}
        />
        {passwordVisible ? (
          <Visible onClick={togglePasswordVisibility}>
            <img src={icVisible} alt="숨김" />
          </Visible>
        ) : (
          <Visible onClick={togglePasswordVisibility}>
            <img src={icInvisible} alt="보임" />
          </Visible>
        )}
      </StyledInfoInput>
    );
  }
  return (
    <StyledInfoInput padding={padding}>
      <div>{text}</div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChangeValue}
        width={width}
        align={align}
        edit={edit}
        type={inputType === 'number' ? 'text' : inputType} // 숫자 입력도 text로 처리하고 유효성 검사함
      />
    </StyledInfoInput>
  );
};

InfoInput.propTypes = {
  text: PropTypes.string.isRequired,
  origValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  editValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  padding: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  inputType: PropTypes.oneOf(['text', 'number', 'password']).isRequired,
};

export default InfoInput;
