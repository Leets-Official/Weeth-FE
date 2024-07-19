import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.div`
  font-size: 18pt;
  font-weight: 600; //semi-bold
`;

const Title = ({ text }) => {
  return <StyledText>{text}</StyledText>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
