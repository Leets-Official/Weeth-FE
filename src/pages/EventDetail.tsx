import useGetEventInfo from '@/api/getEventInfo';
import * as S from '@/styles/event/EventDetail.styled';
import EventTitle from '@/components/Event/EventTitle';
import EventContent from '@/components/Event/EventContent';
import useCustomBack from '@/hooks/useCustomBack';
import { useLocation, useParams } from 'react-router-dom';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';

export interface EventDetailData {
  id: number;
  title: string;
  content: string;
  location: string;
  cardinal: number;
  code?: number;
  name: string;
  requiredItem: string;
  start: string;
  end: string;
  createdAt: string;
  modifiedAt: string;
}

const EventDetail = () => {
  const location = useLocation();
  const year = location.state?.year ?? CURRENT_YEAR;
  const month = location.state?.month ?? CURRENT_MONTH;

  console.log(year, month);
  useCustomBack(`/calendar?year=${year}&month=${month}`);

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
