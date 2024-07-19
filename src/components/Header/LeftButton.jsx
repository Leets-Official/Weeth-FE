import React from 'react';
import styled from 'styled-components';

import prev from '../../assets/images/Frame 45.png';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

//  온클릭 props 추가

const LeftButton = () => {
  return (
    <ImgButton>
      <img src={prev} alt="prev" />
    </ImgButton>
  );
};

export default LeftButton;
