import useGetEventInfo from '@/api/getEventInfo';
import * as S from '@/styles/event/EventDetail.styled';
import EventTitle from '@/components/Event/EventTitle';
import EventContent from '@/components/Event/EventContent';
import UserAPI from '@/api/UserAPI';
import useCustomBack from '@/hooks/useCustomBack';
import { useParams } from 'react-router-dom';

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

const EventDetail = () => {
  useCustomBack('/calendar');

  const { id, type } = useParams();
  const { data: eventDetailData, error } = useGetEventInfo(type, id);
  const isMeeting = type === 'meetings';

  if (error || !eventDetailData) return <S.Error>{error}</S.Error>;

  return (
    <S.EventDetailWrapper>
      <UserAPI />
      <EventTitle data={eventDetailData} isMeeting={isMeeting} />
      <S.Line />
      <EventContent data={eventDetailData} />
    </S.EventDetailWrapper>
  );
};

export default EventDetail;
