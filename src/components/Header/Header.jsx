import styled from 'styled-components';

import LeftButton from './LeftButton';
import RightButton from './RightButton';
import Title from './Title';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//  해당 함수에 온클릭 이벤트 작성
const onClickButton = () => {};

const Header = () => {
  return (
    <StyledHeader>
      <LeftButton onClick={onClickButton} />
      <Title text="게시판" />
      <RightButton text="⋮" />
    </StyledHeader>
  );
};

export default Header;
