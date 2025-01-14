import styled from 'styled-components';
import StatusIndicator from './StatusIndicator';
import SortButton from './SortButton';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const StatusList: React.FC = () => {
  return (
    <FilterWrapper>
      <StatusIndicator status="승인 완료" />
      <StatusIndicator status="대기 중" />
      <StatusIndicator status="추방" />
      <SortButton />
    </FilterWrapper>
  );
};

export default StatusList;
