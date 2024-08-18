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
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

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
