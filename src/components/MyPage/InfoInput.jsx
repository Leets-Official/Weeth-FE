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
  color: white;
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
}) => {
  const [value, setValue] = useState(origValue);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onChangeValue = (e) => {
    setValue(e.target.value);
    editValue(e.target.value);
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
  width: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
};

export default InfoInput;
