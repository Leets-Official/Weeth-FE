import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import prev from '../../assets/images/Frame 45.png';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const LeftButton = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={prev} alt="prev" />
    </ImgButton>
  );
};

LeftButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LeftButton;
