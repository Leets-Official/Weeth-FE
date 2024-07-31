import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import icCalendar from '../assets/images/ic_date.svg';
import icClock from '../assets/images/ic_clock.svg';
import theme from '../styles/theme';
import BoardTitle from '../components/BoardTitle';

const StyledEventDetails = styled.div`
  width: 370px;
`;

const ContentBlock = styled.div`
  background-color: ${theme.color.grayScale.gray18};
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  padding-right: 5px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${theme.color.grayScale.gray30};
  margin: 10px;
  transform: scaleY(0.2);
`;

const EventDetails = () => {
  const { id } = useParams();
  const [eventDetailData, setEventDetailData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const BASE_URL = process.env.REACT_APP_BASE_URL;

        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        };

        if (id) {
          const response = await axios.get(`${BASE_URL}/event/${id}`, {
            headers,
          });
          if (response.data.code === 200) {
            console.log('response detail data:', response.data.data); // 데이터 확인용
            setEventDetailData(response.data.data);
          } else {
            console.error('Error message from API:', response.data.message);
            setError(response.data.message);
          }
        }
      } catch (err) {
        console.error('API Request Error:', err); // 에러 로그
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!eventDetailData) {
    return <div>Loading...</div>;
  }

  const origStartDate = eventDetailData.start;
  const origEndDate = eventDetailData.end;

  const splittedStartDate = origStartDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const startDate = splittedStartDate[0].split('-'); // [YYYY, MM, DD]
  const startTime = splittedStartDate[1].split(':'); // [HH, MM]

  const splittedEndDate = origEndDate.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const endDate = splittedEndDate[0].split('-'); // [YYYY, MM, DD]
  const endTime = splittedEndDate[1].split(':'); // [HH, MM]

  const weekDay = ['일', '월', '화', '수', '목', '금', '토'];

  let isOneday = true;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < startDate.length; i++) {
    if (startDate[i] !== endDate[i]) {
      isOneday = false;
    }
  }

  return (
    <StyledEventDetails>
      <BoardTitle
        eventId={eventDetailData.id}
        text={eventDetailData.title}
        writer={eventDetailData.userName}
        createdAt={eventDetailData.createdAt}
      />
      <Line />
      <ContentBlock>
        {isOneday ? (
          <>
            <TimeInfo>
              <Icon src={icCalendar} alt="calendar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일{' '}
                {weekDay[new Date(origStartDate).getDay()]}요일
              </div>
            </TimeInfo>
            <TimeInfo>
              <Icon src={icClock} alt="clock" />
              <div>
                {startTime[0]}:{startTime[1]} ~ {endTime[0]}:{endTime[1]}
              </div>
            </TimeInfo>
          </>
        ) : (
          <>
            <TimeInfo>
              <Icon src={icCalendar} alt="calendar" />
              <div>
                {startDate[0]}년 {parseInt(startDate[1], 10)}월{' '}
                {parseInt(startDate[2], 10)}일 &#40;
                {weekDay[new Date(origStartDate).getDay()]}&#41; {startTime[0]}:
                {startTime[1]}에서
              </div>
            </TimeInfo>
            <TimeInfo>
              <Icon src={icClock} alt="clock" />
              <div>
                {endDate[0]}년 {parseInt(endDate[1], 10)}월{' '}
                {parseInt(endDate[2], 10)}일 &#40;
                {weekDay[new Date(origEndDate).getDay()]}&#41; {endTime[0]}:
                {endTime[1]}까지
              </div>
            </TimeInfo>
          </>
        )}
      </ContentBlock>
      <ContentBlock>
        <div>장소 : {eventDetailData.location} </div>
        <div>준비물 : {eventDetailData.requiredItems} </div>
        <div>총 인원 : {eventDetailData.memberNumber}</div>
      </ContentBlock>
      <ContentBlock>
        <div>{eventDetailData.content}</div>
      </ContentBlock>
    </StyledEventDetails>
  );
};

export default EventDetails;
