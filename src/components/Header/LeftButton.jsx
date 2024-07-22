import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import prev from '../../assets/images/Frame 45.png';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const LeftButton = () => {
  const navi = useNavigate();

  return (
    <ImgButton
      onClick={() => {
        navi(-1);
      }}
    >
      <img src={prev} alt="prev" />
    </ImgButton>
  );
};

export default LeftButton;
