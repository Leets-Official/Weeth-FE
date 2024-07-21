import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LeftButton from '../Header/LeftButton';
// import RightButton from '../Header/RightButton';
import RegisterStatus from './RegisterStatus';

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

const SignupHeader = ({
  onClickLeftButton,
  isRightButtonEnabled,
  onClickTextButton,
  nextButtonText,
}) => {
  return (
    <StyledHeader>
      <LeftButton onClick={onClickLeftButton} />

      <RegisterStatus
        text={nextButtonText}
        color={isRightButtonEnabled ? 'green' : 'white'}
        onClick={onClickTextButton}
      />
    </StyledHeader>
  );
};

SignupHeader.propTypes = {
  onClickLeftButton: PropTypes.func.isRequired,
  isRightButtonEnabled: PropTypes.bool.isRequired,
  onClickTextButton: PropTypes.func.isRequired,
  nextButtonText: PropTypes.string.isRequired,
};

export default SignupHeader;
