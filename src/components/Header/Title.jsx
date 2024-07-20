import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';

const StyledText = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Title = ({ text }) => {
  return <StyledText>{text}</StyledText>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
