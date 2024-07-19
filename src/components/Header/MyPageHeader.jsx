import styled from 'styled-components';

import LeftButton from './LeftButton';
import Title from './Title';
import RightButton from './RightButton';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const MyPageHeader = () => {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="My" />
      </TitleWrapper>
      <RightButton text="완료" />
    </StyledHeader>
  );
};

export default MyPageHeader;
