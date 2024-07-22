import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LeftButton from '../Header/LeftButton';
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
  setPage,
}) => {
  const handleLeftButtonClick = () => {
    if (page === 0) {
      onClickLeftButton();
    } else {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    onClickTextButton();
    setPage(page + 1);
  };

  return (
    <StyledHeader>
      <LeftButton onClick={handleLeftButtonClick} />
      <RegisterStatus
        text={nextButtonText}
        color={isRightButtonEnabled ? 'green' : 'white'}
        onClick={handleNextClick}
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
  setPage: PropTypes.func.isRequired,
};

export default SignupHeader;
