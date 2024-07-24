import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MiddleButton from '../../Button/MiddleButton';
import theme from '../../../styles/theme';
import icClose from '../../../assets/images/ic_close.svg';
import check from '../../../assets/images/ic_check.svg';
import './ModalAttend.css';
import wrong from '../../../assets/images/ic_wrong.svg';
import correct from '../../../assets/images/ic_correct.svg';

const StyledModal = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: -15%;
  width: 100%;
  height: 115%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
`;

const Line = styled.div`
  border: 1px solid #4d4d4d;
  margin: 30px 10px 0px 10px;
  transform: scaleY(0.2);
`;

const Regular = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
`;

const SemiBold = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
  font-size: 16px;
`;

const RightContainer = () => {
  return (
    <>
      <ImgContainer>
        <img src={correct} alt="정확한 입력 이미지" />
      </ImgContainer>
      <TextContainer>저장 되었습니다.</TextContainer>
    </>
  );
};

const WrongContainer = () => {
  return (
    <>
      <ImgContainer>
        <img src={wrong} alt="잘못된 입력 이미지" />
      </ImgContainer>
      <TextContainer>잘못된 입력입니다.</TextContainer>
    </>
  );
};

const CloseButton = ({ onClick }) => (
  <ImgButton onClick={onClick}>
    <img src={icClose} alt="닫기" />
  </ImgButton>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ModalAttend = ({ open, close }) => {
  const [codeCheck, setCodeCheck] = useState(0);

  const handleCompleteBtn = () => {
    const codeRight = true;
    setCodeCheck(codeRight ? 1 : 2);
  };

  return (
    <StyledModal open={open}>
      <Regular>
        <div className="modal-content">
          <div className="modal-header">
            <img src={check} alt="체크" className="modal-check-icon" />
            <CloseButton onClick={close} />
          </div>
          <div className="modal-body">
            <SemiBold className="modal-title">출석하기</SemiBold>
            <SemiBold className="modal-text">
              오늘은&nbsp;
              <div style={{ color: theme.color.main.mainColor }}>
                프로젝트 중간 발표
              </div>
              &nbsp;가 있는 날이에요
            </SemiBold>
            <div className="modal-date">
              날짜: 2024년 7월 18일 (19:00 - 20:30)
            </div>
            <div className="modal-place">장소: 가천관 247호</div>
            <Line />
            <input
              className="modal-input"
              type="text"
              placeholder="코드를 입력하세요"
            />
          </div>
          <div className="modal-buttons">
            <MiddleButton onClick={handleCompleteBtn}>입력완료</MiddleButton>
          </div>
          {codeCheck === 0 && <div> </div>}
          {codeCheck === 1 && <RightContainer />}
          {codeCheck === 2 && <WrongContainer />}
        </div>
      </Regular>
    </StyledModal>
  );
};

ModalAttend.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalAttend;
