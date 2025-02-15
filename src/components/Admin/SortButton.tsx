import { useState } from 'react';
import styled from 'styled-components';
import SortIcon from '@/assets/images/ic_admin_change.svg';
import { useMemberContext } from './context/MemberContext';

const SortButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ecf9f6;
  gap: 10px;
  padding: 7px;
  border-radius: 4px;
  cursor: pointer;
`;
const SortButton: React.FC = () => {
  const [isAscending, setIsAscending] = useState(false);
  const { sortingOrder, setSortingOrder } = useMemberContext();

  const onClickSort = () => {
    setIsAscending(!isAscending);
    setSortingOrder(isAscending ? 'CARDINAL_DESCENDING' : 'NAME_ASCENDING');
  };
  return (
    <SortButtonWrapper onClick={onClickSort}>
      {sortingOrder === 'NAME_ASCENDING' ? '오름차순' : '기수 순'}
      <img src={SortIcon} alt="sorting" />
    </SortButtonWrapper>
  );
};

export default SortButton;
