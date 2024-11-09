/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventContent from '@/components/Event/EventContent';
import EventTitle from '@/components/Event/EventTitle';
import useCustomBack from '@/router/useCustomBack';
import getEventInfo from '@/service/getEventInfo';
import UserAPI from '@/service/UserAPI';
import * as S from '@/styles/event/EventDetail.styled';

export interface EventDetailData {
  id: number;
  title: string;
  content: string;
  location: string;
  requiredItem: string;
  name: string;
  memberCount: string;
  start: string;
  end: string;
  createdAt: string;
  modifiedAt: string;
}

const EventDetails = () => {
  useCustomBack('/calendar');

  const { id } = useParams();
  const { type } = useParams();
  const [eventDetailData, setEventDetailData] =
    useState<EventDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMeeting = type === 'meetings';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id && type) {
          const response = await getEventInfo(type, Number(id));
          if (response.data.code === 200) {
            setEventDetailData(response.data.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, type]);

  if (error) {
    return <S.Error>데이터를 불러올 수 없습니다.</S.Error>;
  }

  if (!eventDetailData) {
    return null;
  }

  return (
    <S.EventDetailWrapper>
      <UserAPI />
      <EventTitle data={{ ...eventDetailData }} isMeeting={isMeeting} />
      <S.Line />
      <EventContent data={{ ...eventDetailData }} />
    </S.EventDetailWrapper>
  );
};

export default EventDetails;
