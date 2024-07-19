import styled from 'styled-components';

import LeftButton from './LeftButton';
import Title from './Title';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 45px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const UserHeader = () => {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="멤버" />
      </TitleWrapper>
    </StyledHeader>
  );
};

export default UserHeader;
