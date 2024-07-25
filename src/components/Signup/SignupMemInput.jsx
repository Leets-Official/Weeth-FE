import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SignupWhite from './SignupWhite';

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
  weight: 400;
  margin-right: 17%;
  border: none;
  border-bottom: 1px solid #333333;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #333333;
  }
`;

const SignupMemInput = ({ labelName, placeholderText, value, onChange }) => {
  return (
    <MemTextContainer>
      <Label>
        <SignupWhite text={labelName} />
      </Label>
      <InputLine
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </MemTextContainer>
  );
};

SignupMemInput.propTypes = {
  labelName: PropTypes.string,
  placeholderText: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SignupMemInput.defaultProps = {
  labelName: '이름',
  placeholderText: '홍길동',
};

export default SignupMemInput;
