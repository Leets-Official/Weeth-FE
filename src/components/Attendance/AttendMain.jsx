import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import theme from '../../styles/theme';
import './AttendMain.css';
import RightButton from '../Header/RightButton';
import Button from '../Button/Button';
import ModalAttend from './Modal/ModalAttend';
import check from '../../assets/images/ic_check.svg';
import warning from '../../assets/images/ic_warning.svg';
import ModalPenalty from './Modal/ModalPenalty';
import { UserContext } from '../../hooks/UserContext';

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

  const { userData, error } = useContext(UserContext);

  let userName;
  if (error) {
    userName = 'error';
  } else if (!userData) {
    userName = 'loading';
  } else {
    userName = userData.name;
  }

  const [attendanceData, setAttendanceData] = useState(null);
  const [attendFetchError, setAttendFetchError] = useState(null);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
        const headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        const response = await axios.get(
          'http://13.125.78.31:8080/attendances',
          { headers },
        );
        setAttendanceData(response.data.data);
      } catch (err) {
        setAttendFetchError(error.message);
      }
    };

    fetchAttendances();
  }, []);

  let title;
  let location;
  let startDateTime;

  if (attendFetchError) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
  } else if (!attendanceData) {
    title = 'loading';
    location = 'loading';
    startDateTime = 'loading';
  } else {
    title = attendanceData.title;
    location = attendanceData.location;
    // startDate를 년-월-일 형식으로 변경
    const startDate = new Date(attendanceData.startDateTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    startDateTime = startDate.toLocaleDateString('ko-KR', options);
  }

  // 일단 일정 있고 패널티 있는 게 true
  const hasSchedule = true;
  const hasPenalty = true;

  // 출석체크 모달
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // 패널티 모달
  const handleOpenPenaltyModal = () => setPenaltyModalOpen(true);
  const handleClosePenaltyModal = () => setPenaltyModalOpen(false);

  return (
    <StyledAttend>
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
      <Progress>
        <Dealt dealt={dealt} />
      </Progress>
      <StyledBox height="200px">
        <img src={check} alt="v" />
        {hasSchedule ? (
          // 일정 있을 때 출석 컴포넌트
          <div className="attend-container">
            <SemiBold>
              <div className="attend-project">
                오늘은 &quot;{title}&quot;가 있는 날이에요
              </div>
            </SemiBold>
            <div className="attend-date">날짜 : {startDateTime}</div>
            <div className="attend-place">장소 : {location}</div>
            <div className="attend-button">
              <Button
                color={theme.color.grayScale.gray30}
                onClick={handleOpenModal}
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
                textColor={theme.color.grayScale.gray20}
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
                <div style={{ color: theme.color.main.negative }}>1회</div>
              </SemiBold>
              <RightButton onClick={handleOpenPenaltyModal} />
            </ButtonContainer>
            <div className="penalty-info">
              패널티가 1회 적립이 되었어요.
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
