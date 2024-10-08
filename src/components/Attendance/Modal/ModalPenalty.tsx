/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import icClose from '@/assets/images/ic_close.svg';
import check from '@/assets/images/ic_check.svg';
import { PenaltyContext } from '@/service/PenaltyContext';
import { UserContext } from '@/service/UserContext';
import { PenaltyAPI } from '@/service/AttendAPI';

interface CloseButtonProps {
  onClick: () => void;
}
interface PenaltyBoxProps {
  date: string;
  reason: string;
}
interface ModalPenaltyProps {
  open: boolean;
  close: () => void;
}
interface PenaltyProps {
  penaltyId: string;
  penaltyDescription: string;
  time: string; // ISO 8601 형식의 날짜 문자열
}

// Styled components
const StyledModal = styled.div<{ open: boolean }>`
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
  webkitbackdropfilter: 'blur(5px)';
`;

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

// PenaltyBox Component
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

// CloseButton Component
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <ImgButton onClick={onClick}>
      <img src={icClose} alt="Close" />
    </ImgButton>
  );
};

const PenaltyBox: React.FC<PenaltyBoxProps> = ({ date, reason }) => {
  return (
    <PenaltyDetail>
      <PenaltyIcon>+1</PenaltyIcon>
      <PenaltyTextBox>
        <PenaltyText>{date}</PenaltyText>
        <PenaltyText>사유 : {reason}</PenaltyText>
      </PenaltyTextBox>
    </PenaltyDetail>
  );
};

// ModalPenalty Component
const ModalPenalty: React.FC<ModalPenaltyProps> = ({ open, close }) => {
  const { myPenaltyCount, penaltyData, penaltyFetchError } =
    useContext(PenaltyContext);
  const { userData, error } = useContext(UserContext);

  let userName: string;
  if (error) {
    userName = 'error';
  } else if (!userData) {
    userName = 'loading';
  } else {
    userName = userData.name;
  }

  return (
    <StyledModal open={open}>
      <PenaltyAPI />
      <Regular>
        <div className="modal-content" style={{ width: '320px' }}>
          <div className="modal-header">
            <img src={check} alt="Check" className="modal-check-icon" />
            <CloseButton onClick={close} />
          </div>
          <div className="modal-body">
            {penaltyFetchError ? (
              <div>Error loading penalty data</div>
            ) : !penaltyData || !penaltyData.length ? (
              <div>저장된 패널티가 없습니다.</div>
            ) : (
              <>
                <SemiBold className="modal-title">
                  {userName} 님의&nbsp;
                  <div style={{ color: theme.color.main.negative }}>패널티</div>
                  &nbsp;횟수
                </SemiBold>
                <SemiBold className="modal-penalty">
                  {myPenaltyCount}회
                </SemiBold>
                <Line />
                {penaltyData.map((penalty: PenaltyProps) => {
                  const myDate = new Date(penalty.time);
                  const formattedDate = `${myDate.getFullYear()}년 ${
                    myDate.getMonth() + 1
                  }월 ${myDate.getDate()}일 ${myDate.getHours()}:${myDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}`;

                  return (
                    <PenaltyBox
                      key={penalty.penaltyId}
                      reason={penalty.penaltyDescription}
                      date={formattedDate}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Regular>
    </StyledModal>
  );
};

export default ModalPenalty;
