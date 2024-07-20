import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import theme from '../../styles/theme';
import Button from '../Button/Button';
import AttendModal from './Modal/ModalAttend';
import './AttendMain.css';
import RightButton from '../Header/RightButton';

import check from '../../assets/images/ic_check.png';
import warning from '../../assets/images/ic_warning.png';

// 출석률 게이지 임시 값
const ATTEND_GAUGE = 80;
const MAX_ATTEND_GUAGE = 100;

const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${theme.font.family.pretendard_regular};
  include-font-padding: false;
`;

const dealt = Math.floor((ATTEND_GAUGE / MAX_ATTEND_GUAGE) * 100);

const Progress = styled.div`
  width: 86%;
  height: 19px;
  background-color: ${theme.color.main.negative};
  border-radius: 10px;
  overflow: hidden;
  margin: 5% 10px 0px 10px;
`;

const Dealt = styled.div`
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 10px;
  background-color: ${theme.color.main.mainColor};
`;

const StyledBox = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  border-radius: 10px;
  padding: 4%;
  margin: 5.3% 10px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 86%;
`;

const SemiBold = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  include-font-padding: false;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AttendMain = () => {
  const navi = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // const [hasEvent,setHasEvent] = useState(true);
  // const [hasPenalty, setHasPenalty] = useState(true);

  // 일단 일정 있고 패널티 있는 게 디폴트
  const hasSchedule = true;
  const hasPenalty = true;
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <StyledAttend>
      <div className="name-container">
        <SemiBold>
          <div className="attend-name">김위드</div>
        </SemiBold>
        <div className="attend-text">님의 출석률은</div>
      </div>
      <div className="attend-percent">
        <TitleWrapper>
          <SemiBold>
            <div>{ATTEND_GAUGE}%</div>
          </SemiBold>
        </TitleWrapper>
        <RightButtonWrapper>
          <RightButton
            onClick={() => {
              navi('/attendCheck');
            }}
          />
        </RightButtonWrapper>
      </div>
      <Progress>
        <Dealt dealt={dealt} />
      </Progress>
      <StyledBox>
        <img src={check} alt="v" />
        {hasSchedule ? (
          // 일정 있을 때 출석 컴포넌트
          <div>
            <div>일정 있음</div>
            <Button onClick={handleOpenModal}>출석하기</Button>
          </div>
        ) : (
          // 일정 없을 때 출석 컴포넌트
          <div>
            <div>일정 없음</div>
            <Button>출석하기</Button>
          </div>
        )}
      </StyledBox>
      <StyledBox>
        <img src={warning} alt="!" />
        {hasPenalty ? (
          // 패널티 있을 때 패널티 컴포넌트
          <div>
            <div>패널티 있음</div>
            <Button onClick={handleOpenModal}>출석하기</Button>
          </div>
        ) : (
          // 패널티 없을 때 패널티 컴포넌트
          <div>패널티 없음</div>
        )}
      </StyledBox>
      <AttendModal open={modalOpen} close={handleCloseModal} />
    </StyledAttend>
  );
};

export default AttendMain;
