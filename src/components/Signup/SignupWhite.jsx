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
  width: 100%; /* 원래 52%인데 이렇게 하면 안 되더라 */
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  color: ${theme.color.grayScale.white};
  margin-bottom: 0;
  margin-left: 7%;
`;

const SignupWhite = ({ text }) => {
  return <SignupTexts>{text}</SignupTexts>;
};

SignupWhite.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SignupWhite;
