import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import './AttendMain.css';
import RightButton from '../Header/RightButton';
import Button from '../Button/Button';
import ModalAttend from './Modal/ModalAttend';
import check from '../../assets/images/ic_check.svg';
import warning from '../../assets/images/ic_warning.svg';
import ModalPenalty from './Modal/ModalPenalty';
import { UserContext } from '../../hooks/UserContext';
import { PenaltyContext } from '../../hooks/PenaltyContext';
import { AttendContext } from '../../hooks/AttendContext';
import AttendAPI from '../../hooks/AttendAPI';
import PenaltyAPI from '../../hooks/PenaltyAPI';

// 출석률 게이지 임시 값
let ATTEND_GAUGE = 100;
const MAX_ATTEND_GUAGE = 100;

const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${theme.font.family.pretendard_regular};
  include-font-padding: false;
`;

const Progress = styled.div`
  width: 86%;
  height: 19px;
  background-color: ${({ isAttend }) =>
    isAttend === 0 ? theme.color.grayScale.gray20 : theme.color.main.negative};
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
  display: flex;
  flex-direction: row;
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

const PenaltyInfo = styled.div`
  color: ${theme.color.grayScale.gray65};
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 97%;
  margin-right: 3%;
`;

const AttendMain = () => {
  const navi = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [penaltyModalOpen, setPenaltyModalOpen] = useState(false);
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const { userData, error } = useContext(UserContext);

  let userName;
  if (error) {
    userName = 'error';
  } else if (!userData) {
    userName = 'loading';
  } else {
    userName = userData.name;
  }
  const { attendanceData, attendFetchError, hasSchedule } =
    useContext(AttendContext);

  let title;
  let location;
  let startDateTime; // 날짜
  let endDateTime; // 시간
  let isWithinTimeRange = false;

  if (attendFetchError) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
    endDateTime = 'error';
  } else if (!attendanceData) {
    // 데이터를 아직 가져오지 않았거나, 일정이 없는 경우
    title = '로딩중';
    location = '로딩중';
    startDateTime = '로딩중';
    endDateTime = '로딩중';
  } else {
    title = attendanceData.title;
    location = attendanceData.location;

    // Date 객체로 변환
    const startDate = new Date(attendanceData.start);
    const endDate = new Date(attendanceData.end);

    // 날짜 형식으로 변환
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    startDateTime = startDate.toLocaleDateString('ko-KR', dateOptions);

    // 시간 형식으로 변환 (24시간 형식)
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString('ko-KR', timeOptions);
    const endTime = endDate.toLocaleTimeString('ko-KR', timeOptions);

    // 피그마 형식대로 변환
    endDateTime = `(${startTime} ~ ${endTime})`;

    // 현재 시간
    const currentTime = new Date().toLocaleTimeString('ko-KR', timeOptions);

    // 현재 시간이 startTime과 endTime 사이에 있는지 확인
    if (currentTime >= startTime && currentTime <= endTime) {
      isWithinTimeRange = true;
    }
    // 출석률 지정
    if (attendanceData.attendanceRate === null) {
      ATTEND_GAUGE = 0;
    } else {
      ATTEND_GAUGE = attendanceData.attendanceRate;
    }
  }

  const { myPenaltyCount, hasPenalty } = useContext(PenaltyContext);

  const penalty = myPenaltyCount;
  const dealt = Math.floor((ATTEND_GAUGE / MAX_ATTEND_GUAGE) * 100);

  // 출석체크 모달
  const handleOpenModal = () => {
    if (isWithinTimeRange) {
      setModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setShouldFetchData(true); // 모달이 닫힐 때 API를 다시 호출하도록 상태를 업데이트
  };

  // 패널티 모달
  const handleOpenPenaltyModal = () => setPenaltyModalOpen(true);
  const handleClosePenaltyModal = () => setPenaltyModalOpen(false);

  // 모달이 닫힐 때 shouldFetchData가 true로 업데이트되면, API를 다시 호출
  useEffect(() => {
    if (shouldFetchData) {
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  return (
    <StyledAttend>
      <AttendAPI key={shouldFetchData} />
      <PenaltyAPI />
      <div className="name-container">
        <SemiBold>
          <div className="attend-name">{userName}&nbsp;</div>
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
      <Progress isAttend={ATTEND_GAUGE}>
        <Dealt dealt={dealt} />
      </Progress>
      <StyledBox height="200px">
        <img src={check} alt="v" />
        {hasSchedule ? (
          // 일정 있을 때 출석 컴포넌트
          <div className="attend-container">
            <SemiBold>
              <div className="attend-project">
                오늘은{' '}
                <span style={{ color: theme.color.main.mainColor }}>
                  &quot;{title}&quot;
                </span>
                이&#40;가&#41; 있는 날이에요
              </div>
            </SemiBold>
            <div className="attend-date">
              날짜 : {startDateTime} {endDateTime}
            </div>
            <div className="attend-place">장소 : {location}</div>
            <div className="attend-button">
              <Button
                color={
                  isWithinTimeRange
                    ? theme.color.grayScale.gray30
                    : theme.color.grayScale.gray30
                }
                textcolor={
                  isWithinTimeRange
                    ? theme.color.grayScale.white
                    : theme.color.grayScale.gray20
                }
                onClick={handleOpenModal}
                disabled={!isWithinTimeRange}
              >
                출석하기
              </Button>
            </div>
          </div>
        ) : (
          // 일정 없을 때 출석 컴포넌트
          <div className="attend-container">
            <SemiBold>
              <div className="attend-project">오늘은 일정이 없어요</div>
            </SemiBold>
            <div className="attend-place">
              동아리원과 스터디를 하는건 어때요?
            </div>
            <div className="attend-button">
              <Button
                color={theme.color.grayScale.gray30}
                textcolor={theme.color.grayScale.gray20}
              >
                출석하기
              </Button>
            </div>
          </div>
        )}
      </StyledBox>
      <StyledBox>
        <img src={warning} alt="!" />
        {hasPenalty ? (
          // 패널티 있을 때 패널티 컴포넌트
          <div className="penalty-container">
            <ButtonContainer>
              <SemiBold>
                패널티&nbsp;
                <div style={{ color: theme.color.main.negative }}>
                  {penalty}회
                </div>
              </SemiBold>
              <RightButton onClick={handleOpenPenaltyModal} />
            </ButtonContainer>
            <div className="penalty-info">
              패널티가 {penalty}회 적립이 되었어요.
              <br />
              어떤 이유인지 알아볼까요?
            </div>
          </div>
        ) : (
          // 패널티 없을 때 패널티 컴포넌트
          <div className="penalty-container">
            <div className="no-penalty-info">
              <SemiBold>패널티를 받은 이력이 없네요!</SemiBold>
            </div>
          </div>
        )}
        <div>
          <PenaltyInfo>
            패널티를 받는 기준은 아래와 같아요
            <br />
            - 정기 모임에 출석을 하지 않았을 때
            <br />
            - 미션을 제출하지 않았을 때
            <br />
            - 스터디 발표를 하지 않았을 때
            <br />
          </PenaltyInfo>
        </div>
      </StyledBox>
      <ModalAttend open={modalOpen} close={handleCloseModal} />
      <ModalPenalty open={penaltyModalOpen} close={handleClosePenaltyModal} />
    </StyledAttend>
  );
};

export default AttendMain;
