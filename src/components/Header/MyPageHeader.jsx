import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const MyPageHeader = ({ isEdit }) => {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="My" />
      </TitleWrapper>
      {isEdit ? <RightButton text="완료" /> : null}
    </StyledHeader>
  );
};

MyPageHeader.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default MyPageHeader;
