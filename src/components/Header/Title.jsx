import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text }) => {
  return <div>{text}</div>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
