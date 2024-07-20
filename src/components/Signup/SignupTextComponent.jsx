import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import SignupWhite from './SignupWhite';

const Signup = styled.div`
  width: 370px;
  max-width: 370px;
`;

const StyledIdMail = styled.div`
  display: flex;
  width: 100%;
  margin-left: 7%;
  margin-top: 28%;
  margin-bottom: 2%; /* 뭔가 간격이 짧은 것 같기도..? */
  font-size: 18px;
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const StyledTextInput = styled.input`
  position: relative;
  align-items: center;
  width: 87%;
  height: 5%; /* 뭔가 되게 굵은데??????????? */
  margin-left: 7%;
  margin-right: 7%; /* 위 3.24%, 오른쪽 0%, 아래 3.78%, 왼쪽 4.05% */
  padding: 1.4% 0 1.7% 4%;
  border: none;
  border-right: none;
  border-bottom: none;
  border-radius: 4px;
  font-size: 16px;
  color: #ffffff;
  background-color: #2f2f2f;
  outline: none;
`;

const SignupTextComponent = ({ text, value, onChange, placeholder }) => {
  return (
    <Signup>
      <StyledIdMail>
        <SignupWhite text={text} />
      </StyledIdMail>
      <StyledText>
        <StyledTextInput
          value={value} // 현재 입력된 값
          onChange={onChange} // 값이 변경될 때 호출되는 함수
          placeholder={placeholder} // 비어 있을 때 보여줄 안내 문구
        />
      </StyledText>
    </Signup>
  );
};

SignupTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SignupTextComponent.defaultProps = {
  placeholder: 'ex) weeth@gmail.com',
};

export default SignupTextComponent;
