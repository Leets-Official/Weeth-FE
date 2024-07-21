import React from 'react';
import PropTypes from 'prop-types';
import './ModalAttend.css';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import icClose from '../../../assets/images/ic_close.png';
import check from '../../../assets/images/ic_check.png';

const Line = styled.div`
  border: 1px solid #4d4d4d;
  margin-top: 30px;
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

const PenaltyDetail = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const PenaltyIcon = styled.div`
  width: 28px;
  height: 43px;
  background-color: ${theme.color.main.negative};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 10px;
`;

const PenaltyTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const PenaltyText = styled.div`
  font-size: 16px;
  color: white;
`;

const ModalPenalty = ({ open, close }) => {
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open && (
        <Regular>
          <div className="modal-content" style={{ width: '320px' }}>
            <div className="modal-header">
              <img src={check} alt="V" className="modal-check-icon" />
              <CloseButton onClick={close} />
            </div>
            <div className="modal-body">
              <SemiBold className="modal-title">
                김위드 님의&nbsp;
                <div style={{ color: theme.color.main.negative }}>패널티</div>
                &nbsp;횟수
              </SemiBold>
              <SemiBold className="modal-penalty">1회</SemiBold>
              <Line />
              <PenaltyDetail>
                <PenaltyIcon>+1</PenaltyIcon>
                <PenaltyTextBox>
                  <PenaltyText>2024년 7월 18일 19:24</PenaltyText>
                  <PenaltyText>사유 : 미션 미이행</PenaltyText>
                </PenaltyTextBox>
              </PenaltyDetail>
            </div>
          </div>
        </Regular>
      )}
    </div>
  );
};

ModalPenalty.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalPenalty;
