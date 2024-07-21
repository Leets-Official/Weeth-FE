import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LeftButton from '../Header/LeftButton';
// import RightButton from '../Header/RightButton';
import RegisterStatus from './RegisterStatus';
import TextButton from '../Header/TextButton';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

/* const TitleWrapper = styled.div`
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
`; */

/* const NextButton = styled.button`
  color: ${({ disabled }) => (disabled ? 'white' : '#00DDA8')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;;   */

const SignupHeader = ({
  onClickLeftButton,
  isRightButtonEnabled,
  onClickTextButton,
  nextButtonText,
}) => {
  const [page, setPage] = useState(0); // 0: 첫 번째 화면, 1: 두 번째 화면

  const handleLeftButtonClick = () => {
    if (page === 0) {
      onClickLeftButton(); // 이전 페이지로 이동
    } else {
      setPage(0); // 첫 번째 화면으로 이동
    }
  };

  const handleRightButtonClick = () => {
    if (page === 1) {
      setPage(0); // 이전 렌더링(첫 번째 화면)으로 돌아가기
    }
  };

  return (
    <>
      <StyledHeader>
        <LeftButton onClick={handleLeftButtonClick} />

        <RegisterStatus
          text={nextButtonText}
          color={isRightButtonEnabled ? 'green' : 'white'}
          onClick={onClickTextButton}
        />
      </StyledHeader>
      {page === 0 ? (
        <FirstPageComponent onClickNext={() => setPage(1)} />
      ) : (
        <SecondPageComponent onClickPrev={handleRightButtonClick} />
      )}
    </>
  );
};

const FirstPageComponent = ({ onClickNext }) => (
  <div>
    {/* 첫 번째 화면 내용 */}
    <TextButton onClick={onClickNext}>다음</TextButton>
  </div>
);

const SecondPageComponent = ({ onClickPrev }) => (
  <div>
    {/* 두 번째 화면 내용 */}
    <LeftButton onClick={onClickPrev}>이전 렌더링으로 돌아가기</LeftButton>
  </div>
);

FirstPageComponent.propTypes = {
  onClickNext: PropTypes.func.isRequired,
};

SecondPageComponent.propTypes = {
  onClickPrev: PropTypes.func.isRequired,
};
SignupHeader.propTypes = {
  onClickLeftButton: PropTypes.func.isRequired,
  isRightButtonEnabled: PropTypes.bool.isRequired,
  onClickTextButton: PropTypes.func.isRequired,
  nextButtonText: PropTypes.string.isRequired,
};

export default SignupHeader;
