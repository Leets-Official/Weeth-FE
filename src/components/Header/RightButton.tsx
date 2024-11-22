import styled from 'styled-components';

import next from '@/assets/images/ic_right.svg';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const RightButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={next} alt="next" />
    </ImgButton>
  );
};

export default RightButton;
