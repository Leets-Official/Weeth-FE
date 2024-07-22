import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import SignupWhite from './SignupWhite';
import theme from '../../styles/theme';

const SignupContainer = styled.div`
  width: 370px;
  max-width: 370px;
  margin-top: 0; /* 상단 여백을 제거! */
`;

const Margin = styled.div`
  margin-bottom: 15px;
`;

const StyledTextInput = styled.input`
  width: 87%;
  margin: 0 7%;
  padding: 12px 0 14px 4%;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_regular}; /* 폰트 설정 */
  font-weight: 400;
  line-height: 19px; /* 텍스트 높이 설정 */
  color: ${theme.color.grayScale.white};
  background-color: ${theme.color.grayScale.gray18};
  outline: none;
  box-sizing: border-box; /* 패딩 포함 높이 설정 */

  &::placeholder {
    color: ${theme.color.grayScale.gray65}; /* placeholder 텍스트 색상 설정 */
  }
`;

const SignupTextComponent = ({ text, value, onChange, placeholder, type }) => {
  return (
    <SignupContainer>
      <SignupWhite text={text} />
      <Margin />
      <StyledTextInput
        value={value} // 현재 입력된 값
        onChange={onChange} // 값이 변경될 때 호출되는 함수
        placeholder={placeholder} // 비어 있을 때 보여줄 안내 문구
        type={type}
      />
    </SignupContainer>
  );
};

SignupTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

SignupTextComponent.defaultProps = {
  placeholder: 'ex) weeth@gmail.com',
  type: 'text',
};

export default SignupTextComponent;
