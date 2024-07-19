import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import prev from '../../assets/images/Frame 45.png';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

/*
LeftButton은 < 이거로만 사용돼서 다른 옵션은 추가하지 않았음!
onClick props는 onClickButton 함수를 삭제하고 익명함수를 사용해도 됨
*/

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
