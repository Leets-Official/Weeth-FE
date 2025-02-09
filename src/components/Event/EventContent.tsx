import icCalendar from '@/assets/images/ic_date.svg';
import { WEEK_DAYS } from '@/constants/dateConstants';
import { EventDetailData } from '@/pages/EventDetail';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/event/EventContent.styled';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import Modal from '@/components/common/Modal';
import { useState } from 'react';

const EventContent = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  useCustomBack('/calendar');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const origStartDate = data.start;
  const origEndDate = data.end;

  const splittedStartDate = origStartDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const startDate = splittedStartDate[0].split('-'); // [YYYY, MM, DD]
  const startTime = splittedStartDate[1].split(':'); // [HH, MM]

  const splittedEndDate = origEndDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const endDate = splittedEndDate[0].split('-'); // [YYYY, MM, DD]
  const endTime = splittedEndDate[1].split(':'); // [HH, MM]

  let isOneday = true;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < startDate.length; i++) {
    if (startDate[i] !== endDate[i]) {
      isOneday = false;
    }
  }

  return (
    <S.Container>
      {isModalOpen && (
        <Modal hasCloseButton={false} onClose={() => setIsModalOpen(false)}>
          <S.Title>출석코드</S.Title>
          <S.AttendanceCode>1234</S.AttendanceCode>
        </Modal>
      )}
      {isAdmin && (
        <Button
          color={theme.color.mainMiddle}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          출석코드 확인
        </Button>
      )}
      <S.ContentBlock>
        {isOneday ? (
          <S.Time>
            <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
            <div>
              {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
              {parseInt(startDate[2], 10)}일 (
              {WEEK_DAYS[new Date(origStartDate).getDay()]}) {startTime[0]}:
              {startTime[1]} ~ {endTime[0]}:{endTime[1]}
            </div>
          </S.Time>
        ) : (
          <>
            <S.Time>
              <img src={icCalendar} alt="calendar" style={{ marginRight: 5 }} />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일 (
                {WEEK_DAYS[new Date(origStartDate).getDay()]}) {startTime[0]}:
                {startTime[1]}
              </div>
            </S.Time>
            <S.Time>
              <S.EndTime>
                ~ {endDate[0]}년 {parseInt(endDate[1], 10)}월{' '}
                {parseInt(endDate[2], 10)}일 (
                {WEEK_DAYS[new Date(origEndDate).getDay()]}) {endTime[0]}:
                {endTime[1]}
              </S.EndTime>
            </S.Time>
          </>
        )}
      </S.ContentBlock>
      <S.ContentBlock>
        <div>장소 : {data.location} </div>
        <div>총 인원 : {data.memberCount}</div>
      </S.ContentBlock>
      <S.ContentBlock>
        <div>{data.content}</div>
      </S.ContentBlock>
    </S.Container>
  );
};

export default EventContent;
