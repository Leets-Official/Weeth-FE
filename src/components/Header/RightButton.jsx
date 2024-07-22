import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import next from '../../assets/images/ic_right.svg';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const RightButton = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={next} alt="next" />
    </ImgButton>
  );
};

RightButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RightButton;
