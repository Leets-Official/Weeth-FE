import React from 'react';
import PropTypes from 'prop-types';
import './ModalAttend.css';
import styled from 'styled-components';
import MiddleButton from '../../Button/MiddleButton';
import theme from '../../../styles/theme';
import icClose from '../../../assets/images/ic_close.png';
import check from '../../../assets/images/ic_check.png';

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
const CloseButton = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={icClose} alt="X" />
    </ImgButton>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ModalAttend = ({ open, close }) => {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && (
        <Regular>
          <div className="modal-content">
            <div className="modal-header">
              <img src={check} alt="V" className="modal-check-icon" />
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
              <MiddleButton onClick={close}>입력완료</MiddleButton>
            </div>
          </div>
        </Regular>
      )}
    </div>
  );
};

ModalAttend.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalAttend;
