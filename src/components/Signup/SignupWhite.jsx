import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// const StyledText = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
// `;
const SignupWidth = styled.div`
  width: 370px;
  max-width: 370px;
`;

const SignupTexts = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%; /* 원래 52%인데 이렇게 하면 안 되더라 */
  height: 19px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  color: white;
`;

const SignupWhite = ({ text }) => {
  return (
    <SignupWidth>
      <SignupTexts>{text}</SignupTexts>
    </SignupWidth>
  );
};

/* div className="signup"이렇게 하면 안 되더라 */

SignupWhite.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SignupWhite;
