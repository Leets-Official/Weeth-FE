import prev from '@/assets/images/ic_left.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
