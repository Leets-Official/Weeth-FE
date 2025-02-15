import theme from '@/styles/theme';
import { useEffect, useState } from 'react';

import ModalAttend from '@/components/Attendance/Modal/ModalAttend';
import ModalPenalty from '@/components/Attendance/Modal/ModalPenalty';

import RightButton from '@/components/Header/RightButton';
import check from '@/assets/images/ic_check.svg';
import warning from '@/assets/images/ic_warning.svg';

import * as S from '@/styles/attend/AttendMain.styled';
import useGetAttend from '@/api/useGetAttend';
import useGetPenalty from '@/api/useGetPenalty';
import { AttendInfo, NoAttnedInfo } from './AttendInfo';
import AttendRate from './AttendRate';

const AttendMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [penaltyModalOpen, setPenaltyModalOpen] = useState<boolean>(false);
  const [hasPenalty, setHasPenalty] = useState<boolean>(false);

  const { penaltyInfo } = useGetPenalty();
  const [isAttend, setIsAttend] = useState(false);
  const { attendInfo, hasSchedule, error } = useGetAttend(isAttend);
  console.log(attendInfo);

  useEffect(() => {
    setHasPenalty(
      penaltyInfo?.penaltyCount ? penaltyInfo.penaltyCount > 0 : false,
    );
  }, [penaltyInfo]);

  let title: string;
  let location: string;
  let startDateTime: string;
  let endDateTime: string;
  let isWithinTimeRange = false;

  if (error) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
    endDateTime = 'error';
  } else if (!attendInfo) {
    title = '로딩중';
    location = '로딩중';
    startDateTime = '로딩중';
    endDateTime = '로딩중';
  } else {
    title = attendInfo.title;
    location = attendInfo.location;

    const startDate = new Date(attendInfo.start);
    const endDate = new Date(attendInfo.end);

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
  }
  useEffect(() => {
    if (attendInfo?.status === 'ATTEND') {
      setIsAttend(true);
    }
  }, [attendInfo?.status]);

  const handleOpenModal = () => {
    if (isWithinTimeRange) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenPenaltyModal = () => setPenaltyModalOpen(true);
  const handleClosePenaltyModal = () => setPenaltyModalOpen(false);

  return (
    <S.StyledAttend>
      <AttendRate attendRate={attendInfo?.attendanceRate} />
      <S.StyledBox>
        <img src={check} alt="v" />
        {hasSchedule && attendInfo && !error ? (
          <AttendInfo
            title={title}
            location={location}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
            isWithinTimeRange={isWithinTimeRange}
            handleOpenModal={handleOpenModal}
            isAttend={isAttend}
          />
        ) : (
          <NoAttnedInfo />
        )}
      </S.StyledBox>
      <S.StyledBox>
        <img src={warning} alt="!" />
        {penaltyInfo?.penaltyCount === null ? (
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
                    <div style={{ color: theme.color.negative }}>
                      {penaltyInfo?.penaltyCount}회
                    </div>
                  </S.SemiBold>
                  <RightButton onClick={handleOpenPenaltyModal} />
                </S.ButtonContainer>
                <S.PenaltyCount>
                  패널티가 {penaltyInfo?.penaltyCount}회 적립이 되었어요.
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
      <ModalAttend
        title={title}
        location={location}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        open={modalOpen}
        close={handleCloseModal}
        handleAttend={setIsAttend}
      />
      <ModalPenalty open={penaltyModalOpen} close={handleClosePenaltyModal} />
    </S.StyledAttend>
  );
};

export default AttendMain;
