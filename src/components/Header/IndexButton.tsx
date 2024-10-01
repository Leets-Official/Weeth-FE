import React from 'react';
import styled from 'styled-components';

import more from '@/assets/images/ic_menu.svg';

interface IndexButtonProps {
  onClick: () => void;
}

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const IndexButton: React.FC<IndexButtonProps> = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={more} alt="more" />
    </ImgButton>
  );
};

export default IndexButton;
