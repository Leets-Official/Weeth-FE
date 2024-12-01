import icPlus from '@/assets/images/ic_plus.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ImgButton = styled.img`
  cursor: pointer;
`;

const PlusButton = () => {
  const navi = useNavigate();
  return (
    <ImgButton
      src={icPlus}
      alt="+"
      onClick={() => {
        navi('/events/create');
      }}
    />
  );
};

export default PlusButton;
