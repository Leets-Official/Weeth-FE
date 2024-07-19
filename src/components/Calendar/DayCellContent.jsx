import React from 'react';
import PropTypes from 'prop-types';

const DayCellContent = ({ date }) => {
  return <div>{date.getDate()}</div>;
};

DayCellContent.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DayCellContent;
