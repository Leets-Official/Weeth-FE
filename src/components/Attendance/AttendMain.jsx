import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import theme from '../../styles/theme';
import Button from '../Button/Button';
import AttendModal from './Modal/ModalAttend';
import './AttendMain.css';
import RightButton from '../Header/RightButton';

// 출석률 게이지 임시 값
const ATTEND_GAUGE = 80;
const MAX_ATTEND_GUAGE = 100;

const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const dealt = Math.floor((ATTEND_GAUGE / MAX_ATTEND_GUAGE) * 100);

const Progress = styled.div`
  width: 86%;
  height: 19px;
  background-color: ${theme.color.main.negative};
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
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
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 86%;
`;

const AttendMain = () => {
  const navi = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <StyledAttend>
      <div>김위드 님의 출석률은</div>
      <div className="attend-percent">
        <div>{ATTEND_GAUGE}%</div>
        <RightButton
          onClick={() => {
            navi('/attendCheck');
          }}
        />
      </div>
      <Progress>
        <Dealt dealt={dealt} />
      </Progress>
      <StyledBox>
        <div>v</div>
        <div>오늘은 일정이 없어요</div>
        <div>동아리원과 스터디를 하는 건 어때요?</div>
        <Button onClick={handleOpenModal}>출석하기</Button>
      </StyledBox>
      <StyledBox>
        <div>i</div>
        <div className="button-container">
          <div>패널티 1회</div>
          <RightButton text=">" />
        </div>
        <div>
          패널티가 1회 적립이 되었어요.
          <br />
          어떤 이유인지 알아볼까요?
        </div>
        <div className="penalty-info">
          패널티를 받는 기준은 아래와 같아요
          <br />
          - 정기 모임에 출석을 하지 않았을 때
          <br />
          - 미션을 제출하지 않았을 때
          <br />
          - 스터디 발표를 하지 않았을 때
          <br />
        </div>
      </StyledBox>
      <AttendModal open={modalOpen} close={handleCloseModal} />
    </StyledAttend>
  );
};

export default AttendMain;
