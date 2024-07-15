import React from 'react';
import PropTypes from 'prop-types';

const NextButton = ({ text }) => {
  return <button type="button">{text}</button>;
};

NextButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NextButton;
