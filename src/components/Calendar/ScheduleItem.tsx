import styled from 'styled-components';
import theme from '@/styles/theme';
import { formatDateTime } from '@/hooks/formatDate';
import TodayIncluded from '@/hooks/TodayIncluded';
import TodayPassed from '@/hooks/TodayPassed';

const Container = styled.div<{ isTodayPassed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 345px;
  height: 53px;
  background-color: ${(props) =>
    props.isTodayPassed ? theme.color.gray[9] : theme.color.gray[18]};
  color: ${(props) => (props.isTodayPassed ? theme.color.gray[65] : '#fff')};
  border-radius: 5px;
  padding: 5px;
`;

const Line = styled.div<{ isTodayIncluded: boolean }>`
  width: 5px;
  height: 53px;
  background-color: ${(props) =>
    props.isTodayIncluded ? theme.color.main : '#fff'};
  border-radius: 11px;
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
  title,
  start,
  end,
}: {
  title: string;
  start: string;
  end: string;
}) => {
  const isTodayIncluded = TodayIncluded(start, end);
  const isTodayPassed = TodayPassed(end);

  return (
    <Container isTodayPassed={isTodayPassed}>
      <Line isTodayIncluded={isTodayIncluded} />
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
