import styled from 'styled-components';
import PropTypes from 'prop-types';

import LeftButton from './LeftButton';
import Title from './Title';
import RightButton from './RightButton';

/* eslint-disable no-alert */

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

//  해당 함수에 온클릭 이벤트 작성
const onClickButton = () => {};

const MyPageHeader = ({ isEdit }) => {
  return (
    <StyledHeader>
      <LeftButton onClick={onClickButton} />
      <TitleWrapper>
        <Title text="My" />
      </TitleWrapper>
      {isEdit ? (
        <RightButton
          text="완료"
          onClick={() => window.confirm('저장하시겠습니까?')}
        />
      ) : null}
    </StyledHeader>
  );
};

MyPageHeader.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default MyPageHeader;
