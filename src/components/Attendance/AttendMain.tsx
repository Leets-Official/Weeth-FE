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
import Loading from '../common/Loading';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale('ko');

const AttendMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [penaltyModalOpen, setPenaltyModalOpen] = useState<boolean>(false);
  const [hasPenalty, setHasPenalty] = useState<boolean>(false);

  const { penaltyInfo, isLoading: penaltyLoading } = useGetPenalty();
  const [isAttend, setIsAttend] = useState(false);
  const {
    attendInfo,
    hasSchedule,
    isLoading: attendLoading,
  } = useGetAttend(isAttend);

  useEffect(() => {
    setHasPenalty(
      penaltyInfo?.penaltyCount ? penaltyInfo.penaltyCount > 0 : false,
    );
  }, [penaltyInfo]);

  useEffect(() => {
    if (attendInfo?.status === 'ATTEND') {
      setIsAttend(true);
    }
  }, [attendInfo?.status]);

  if (attendLoading || penaltyLoading) {
    return <Loading />;
  }

  let title = 'Loading...';
  let location = 'Loading...';
  let startDateTime = 'Loading...';
  let endDateTime = 'Loading...';
  let isWithinTimeRange = false;

  if (attendInfo) {
    title = attendInfo.title || 'No title';
    location = attendInfo.location || 'No location';

    const startDate = attendInfo.start ? dayjs(attendInfo.start) : dayjs();
    const endDate = attendInfo.end ? dayjs(attendInfo.end) : dayjs();

    startDateTime = startDate.format('YYYY년 MMMM D일');
    const startTime = startDate.locale('en').format('h:mm A');
    const endTime = endDate.locale('en').format('h:mm A');

    endDateTime = `(${startTime} ~ ${endTime})`;

    const currentTime = dayjs().format('h:mm A');
    isWithinTimeRange = currentTime >= startTime && currentTime <= endTime;
  }

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
        {hasSchedule && attendInfo ? (
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
