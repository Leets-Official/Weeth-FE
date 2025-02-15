import useGetEventInfo from '@/api/getEventInfo';
import * as S from '@/styles/event/EventDetail.styled';
import EventTitle from '@/components/Event/EventTitle';
import EventContent from '@/components/Event/EventContent';
import useCustomBack from '@/hooks/useCustomBack';
import { useParams } from 'react-router-dom';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';

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
  const { isAdmin } = useGetGlobaluserInfo();
  const { data: eventDetailData, error } = useGetEventInfo(type, id);

  if (error || !eventDetailData) return <S.Error>{error}</S.Error>;

  return (
    <S.EventDetailWrapper>
      <EventTitle data={eventDetailData} isAdmin={isAdmin} />
      <S.Line />
      <EventContent data={eventDetailData} isAdmin={isAdmin} />
    </S.EventDetailWrapper>
  );
};

export default EventDetail;
