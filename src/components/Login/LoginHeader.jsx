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

const LoginHeader = ({ isRightButtonEnabled, onCompleteClick }) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TextButton
        text="완료"
        color={isRightButtonEnabled ? 'mainColor' : theme.color.grayScale.white}
        onClick={onCompleteClick}
      />
    </StyledHeader>
  );
};

LoginHeader.propTypes = {
  isRightButtonEnabled: PropTypes.bool.isRequired,
  onCompleteClick: PropTypes.func.isRequired,
};

export default LoginHeader;
