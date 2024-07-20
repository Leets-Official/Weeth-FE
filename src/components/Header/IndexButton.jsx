import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import more from '../../assets/images/Vector.png';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  padding: 3px 10px;
`;

const IndexButton = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={more} alt="more" />
    </ImgButton>
  );
};

IndexButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default IndexButton;