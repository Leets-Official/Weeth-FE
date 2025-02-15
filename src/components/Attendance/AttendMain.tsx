import { useEffect, useState } from 'react';

import ModalAttend from '@/components/Attendance/Modal/ModalAttend';
import ModalPenalty from '@/components/Attendance/Modal/ModalPenalty';

import check from '@/assets/images/ic_check.svg';
import warning from '@/assets/images/ic_warning.svg';

import * as S from '@/styles/attend/AttendMain.styled';
import useGetAttend from '@/api/useGetAttend';
import useGetPenalty from '@/api/useGetPenalty';
import { AttendInfo, NoAttnedInfo } from '@/components/Attendance/AttendInfo';
import AttendRate from '@/components/Attendance/AttendRate';
import {
  MyPenaltyInfo,
  PenaltyInfo,
} from '@/components/Attendance/PenaltyInfo';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale('ko');

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

    const startDate = dayjs(attendInfo.start);
    const endDate = dayjs(attendInfo.end);

    startDateTime = startDate.format('YYYY년 MMMM D일');
    const startTime = startDate.format('HH:mm');
    const endTime = endDate.format('HH:mm');

    endDateTime = `(${startTime} ~ ${endTime})`;

    const currentTime = dayjs().format('HH:mm');

    isWithinTimeRange = currentTime >= startTime && currentTime <= endTime;
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

  console.log(penaltyInfo);

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
              <MyPenaltyInfo
                penaltyCount={penaltyInfo?.penaltyCount}
                handleOpenPenaltyModal={handleOpenPenaltyModal}
              />
            ) : (
              <S.PenaltyContainer>
                <S.NoPenaltyInfo>
                  <S.SemiBold>패널티를 받은 이력이 없네요!</S.SemiBold>
                </S.NoPenaltyInfo>
              </S.PenaltyContainer>
            )}
            <PenaltyInfo />
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
