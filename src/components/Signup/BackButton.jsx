import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import prev from '../../assets/images/ic_left.svg';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const BackButton = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={prev} alt="prev" />
    </ImgButton>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
