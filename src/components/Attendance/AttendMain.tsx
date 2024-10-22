import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '@/styles/theme';

import RightButton from '@/components/Header/RightButton';
import Button from '@/components/Button/Button';
import ModalAttend from '@/components/Attendance/Modal/ModalAttend';
import ModalPenalty from '@/components/Attendance/Modal/ModalPenalty';

import check from '@/assets/images/ic_check.svg';
import warning from '@/assets/images/ic_warning.svg';

import { UserContext } from '@/service/UserContext';
import { PenaltyContext } from '@/service/PenaltyContext';
import { AttendContext } from '@/service/AttendContext';
import { AttendAPI, PenaltyAPI } from '@/service/AttendAPI';

import * as S from '@/styles/attend/AttendMain.styled';

// 출석률 게이지 임시 값
let ATTEND_GAUGE = 0;
const MAX_ATTEND_GUAGE = 100;

const AttendMain: React.FC = () => {
  const navi = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [penaltyModalOpen, setPenaltyModalOpen] = useState<boolean>(false);
  const [shouldFetchData, setShouldFetchData] = useState<boolean>(false);
  const [hasPenalty, setHasPenalty] = useState<boolean>(false);

  const { userData } = useContext(UserContext);

  let userName: string;
  if (!userData) {
    userName = 'loading';
  } else {
    userName = userData.name;
  }

  const { attendanceData, attendFetchError, hasSchedule } =
    useContext(AttendContext);

  let title: string;
  let location: string;
  let startDateTime: string;
  let endDateTime: string;
  let isWithinTimeRange = false;

  if (attendFetchError) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
    endDateTime = 'error';
  } else if (!attendanceData) {
    title = '로딩중';
    location = '로딩중';
    startDateTime = '로딩중';
    endDateTime = '로딩중';
  } else {
    title = attendanceData.title;
    location = attendanceData.location;

    const startDate = new Date(attendanceData.start);
    const endDate = new Date(attendanceData.end);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    startDateTime = startDate.toLocaleDateString('ko-KR', dateOptions);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const startTime = startDate.toLocaleTimeString('ko-KR', timeOptions);
    const endTime = endDate.toLocaleTimeString('ko-KR', timeOptions);

    endDateTime = `(${startTime} ~ ${endTime})`;

    const currentTime = new Date().toLocaleTimeString('ko-KR', timeOptions);

    if (currentTime >= startTime && currentTime <= endTime) {
      isWithinTimeRange = true;
    }

    ATTEND_GAUGE = attendanceData.attendanceRate ?? 0;
  }

  const { myPenaltyCount } = useContext(PenaltyContext);

  useEffect(() => {
    setHasPenalty(myPenaltyCount > 0);
  }, [myPenaltyCount]);

  const dealt = Math.floor((ATTEND_GAUGE / MAX_ATTEND_GUAGE) * 100);

  const handleOpenModal = () => {
    if (isWithinTimeRange) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setShouldFetchData(true);
  };

  const handleOpenPenaltyModal = () => setPenaltyModalOpen(true);
  const handleClosePenaltyModal = () => setPenaltyModalOpen(false);

  useEffect(() => {
    if (shouldFetchData) {
      setShouldFetchData(false);
    }
  }, [shouldFetchData]);

  return (
    <S.StyledAttend>
      <AttendAPI key={shouldFetchData.toString()} />
      <PenaltyAPI />
      <S.NameContainer>
        <S.SemiBold>
          <S.AttendName>{userName}&nbsp;</S.AttendName>
        </S.SemiBold>
        <S.AttendText>님의 출석률은</S.AttendText>
      </S.NameContainer>
      <S.AttendPercent>
        <S.TitleWrapper>
          <S.SemiBold>
            <div>{ATTEND_GAUGE}%</div>
          </S.SemiBold>
        </S.TitleWrapper>
        <S.RightButtonWrapper>
          <RightButton onClick={() => navi('/attendCheck')} />
        </S.RightButtonWrapper>
      </S.AttendPercent>
      <S.Progress $isAttend={ATTEND_GAUGE}>
        <S.Dealt $dealt={dealt} />
      </S.Progress>
      <S.StyledBox>
        <img src={check} alt="v" />
        {hasSchedule ? (
          <div>
            <S.SemiBold>
              <S.AttendProject>
                오늘은{' '}
                <span style={{ color: theme.color.main.mainColor }}>
                  &quot;{title}&quot;
                </span>
                이&#40;가&#41; 있는 날이에요
              </S.AttendProject>
            </S.SemiBold>
            <S.AttendDate>
              날짜 : {startDateTime} {endDateTime}
            </S.AttendDate>
            <S.AttendPlace>장소 : {location}</S.AttendPlace>
            <S.AttendButton>
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
            </S.AttendButton>
          </div>
        ) : (
          <div>
            <S.SemiBold>
              <S.AttendProject>오늘은 일정이 없어요</S.AttendProject>
            </S.SemiBold>
            <S.AttendPlace>동아리원과 스터디를 하는건 어때요?</S.AttendPlace>
            <S.AttendButton>
              <Button
                color={theme.color.grayScale.gray30}
                textcolor={theme.color.grayScale.gray20}
              >
                출석하기
              </Button>
            </S.AttendButton>
          </div>
        )}
      </S.StyledBox>
      <S.StyledBox>
        <img src={warning} alt="!" />
        {myPenaltyCount === null ? (
          <S.SemiBold>
            <S.AttendProject>등록된 데이터가 없습니다.</S.AttendProject>
          </S.SemiBold>
        ) : (
          <>
            {hasPenalty ? (
              <S.PenaltyContainer>
                <S.ButtonContainer>
                  <S.SemiBold>
                    패널티&nbsp;
                    <div style={{ color: theme.color.main.negative }}>
                      {myPenaltyCount}회
                    </div>
                  </S.SemiBold>
                  <RightButton onClick={handleOpenPenaltyModal} />
                </S.ButtonContainer>
                <S.PenaltyCount>
                  패널티가 {myPenaltyCount}회 적립이 되었어요.
                  <br />
                  어떤 이유인지 알아볼까요?
                </S.PenaltyCount>
              </S.PenaltyContainer>
            ) : (
              <S.PenaltyContainer>
                <S.NoPenaltyInfo>
                  <S.SemiBold>패널티를 받은 이력이 없네요!</S.SemiBold>
                </S.NoPenaltyInfo>
              </S.PenaltyContainer>
            )}
            <div>
              <S.PenaltyInfo>
                패널티를 받는 기준은 아래와 같아요
                <br />
                - 정기 모임에 출석을 하지 않았을 때
                <br />
                - 미션을 제출하지 않았을 때
                <br />
                - 스터디 발표를 하지 않았을 때
                <br />
              </S.PenaltyInfo>
            </div>
          </>
        )}
      </S.StyledBox>
      <ModalAttend open={modalOpen} close={handleCloseModal} />
      <ModalPenalty open={penaltyModalOpen} close={handleClosePenaltyModal} />
    </S.StyledAttend>
  );
};

export default AttendMain;
