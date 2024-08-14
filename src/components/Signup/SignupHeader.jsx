import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from '../Header/LeftButton';
import TextButton from '../Header/TextButton';
import theme from '../../styles/theme';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

/* const TitleWrapper = styled.div`
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
`; */

/* const NextButton = styled.button`
  color: ${({ disabled }) => (disabled ? 'white' : '#00DDA8')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;;   */

const SignupHeader = ({ isRightButtonEnabled, onClickTextButton }) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TextButton
        onClick={onClickTextButton}
        disabled={!isRightButtonEnabled}
        text="완료"
        color={isRightButtonEnabled ? 'mainColor' : theme.color.grayScale.white}
      />
    </StyledHeader>
  );
};

SignupHeader.propTypes = {
  isRightButtonEnabled: PropTypes.bool.isRequired,
  onClickTextButton: PropTypes.func.isRequired,
};

export default SignupHeader;
