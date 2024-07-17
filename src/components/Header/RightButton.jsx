import React from 'react';
import PropTypes from 'prop-types';

const RightButton = ({ text }) => {
  return <button type="button">{text}</button>;
};

RightButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default RightButton;
