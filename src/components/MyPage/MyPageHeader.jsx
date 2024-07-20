import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';
import TextButton from '../Header/TextButton';

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

const MyPageHeader = ({ isEdit }) => {
  const navi = useNavigate();

  return (
    <StyledHeader>
      <LeftButton
        onClick={() => {
          navi(-1);
        }}
      />
      <TitleWrapper>
        <Title text="My" />
      </TitleWrapper>
      {isEdit ? (
        <TextButton
          text="완료"
          color="green"
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
