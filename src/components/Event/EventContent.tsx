/* eslint-disable no-console */

import icClock from '@/assets/images/ic_clock.svg';
import icCalendar from '@/assets/images/ic_date.svg';
import { WEEK_DAYS } from '@/constants/dateConstants';
import { EventDetailData } from '@/pages/EventDetails';
import useCustomBack from '@/router/useCustomBack';
import * as S from '@/styles/event/EventContent.styled';

const EventContent = ({ data }: { data: EventDetailData }) => {
  useCustomBack('/calendar');

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
    <>
      <S.ContentBlock>
        {isOneday ? (
          <>
            <S.TimeInfo>
              <S.Icon src={icCalendar} alt="calendar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일{' '}
                {WEEK_DAYS[new Date(origStartDate).getDay()]}요일
              </div>
            </S.TimeInfo>
            <S.TimeInfo>
              <S.Icon src={icClock} alt="clock" />
              <div>
                {startTime[0]}:{startTime[1]} ~ {endTime[0]}:{endTime[1]}
              </div>
            </S.TimeInfo>
          </>
        ) : (
          <>
            <S.TimeInfo>
              <S.Icon src={icCalendar} alt="calendar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일 &#40;
                {WEEK_DAYS[new Date(origStartDate).getDay()]}&#41;{' '}
                {startTime[0]}:{startTime[1]}에서
              </div>
            </S.TimeInfo>
            <S.TimeInfo>
              <S.EndTime>
                {endDate[0]}년 {parseInt(endDate[1], 10)}월{' '}
                {parseInt(endDate[2], 10)}일 &#40;
                {WEEK_DAYS[new Date(origEndDate).getDay()]}&#41; {endTime[0]}:
                {endTime[1]}까지
              </S.EndTime>
            </S.TimeInfo>
          </>
        )}
      </S.ContentBlock>
      <S.ContentBlock>
        <div>장소 : {data.location} </div>
        <div>준비물 : {data.requiredItem} </div>
        <div>총 인원 : {data.memberCount}</div>
      </S.ContentBlock>
      <S.ContentBlock>
        <div>{data.content}</div>
      </S.ContentBlock>
    </>
  );
};

export default EventContent;
