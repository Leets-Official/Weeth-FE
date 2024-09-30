import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import prev from '../../assets/images/ic_left.svg';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const LeftButton: React.FC = () => {
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
