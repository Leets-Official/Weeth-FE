import styled from 'styled-components';
import theme from '@/styles/theme';
import { formatDateTime } from '@/hooks/formatDate';
import TodayIncluded from '@/hooks/TodayIncluded';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 345px;
  height: 63px;
  background-color: ${theme.color.gray[18]};
  color: #fff;
  border-radius: 5px;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
    background-color: ${theme.color.gray[9]};
    color: ${theme.color.gray[65]};
  }
`;

const Line = styled.div<{ $isTodayIncluded: boolean }>`
  width: 5px;
  height: 53px;
  background-color: ${(props) =>
    props.$isTodayIncluded ? theme.color.main : '#fff'};
  border-radius: 11px;
  margin-left: 5px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
`;

const Date = styled.div`
  font-size: 12px;
`;

const ScheduleItem = ({
  id,
  title,
  start,
  end,
  isMeeting,
  year,
  month,
}: {
  id: number;
  title: string;
  start: string;
  end: string;
  isMeeting: boolean;
  year: number;
  month: number;
}) => {
  const isTodayIncluded = TodayIncluded(start, end);
  const navi = useNavigate();

  const onClick = () => {
    if (isMeeting) {
      navi(`/meetings/${id}`, { state: { year, month } });
    } else {
      navi(`/events/${id}`, { state: { year, month } });
    }
  };

  return (
    <Container onClick={onClick}>
      <Line $isTodayIncluded={isTodayIncluded} />
      <Text>
        <Title>{title}</Title>
        <Date>
          {formatDateTime(start)} ~ {formatDateTime(end)}
        </Date>
      </Text>
    </Container>
  );
};

export default ScheduleItem;
