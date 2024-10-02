import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import theme from '../../styles/theme';

// const StyledText = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
// `;

const SignupTexts = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${theme.color.grayScale.white};
  margin-bottom: 0;
  line-height: 1.2; /* Adjust line height to prevent text overlap */
  white-space: nowrap;
`;

const SignupWhite = ({ text }) => {
  return <SignupTexts>{text}</SignupTexts>;
};

SignupWhite.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SignupWhite;
