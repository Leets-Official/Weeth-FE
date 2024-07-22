import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LeftButton from '../Header/LeftButton';
import BackButton from './BackButton';
import RegisterStatus from './RegisterStatus';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px;
`;

const SignupHeader = ({
  onClickLeftButton,
  isRightButtonEnabled,
  onClickTextButton,
  nextButtonText,
  page,
}) => {
  return (
    <StyledHeader>
      {page === 0 ? (
        <LeftButton onClick={onClickLeftButton} />
      ) : (
        <BackButton onClick={onClickLeftButton} />
      )}
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
  page: PropTypes.number.isRequired,
};

export default SignupHeader;
