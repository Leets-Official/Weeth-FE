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
  const { members, setFilteredMembers } = useMemberContext();
  const [isAscending, setIsAscending] = useState(false);

  const onClickSort = () => {
    setIsAscending(!isAscending);

    const sortedMembers = [...members].sort((a, b) => {
      // 이름 오름차순
      if (isAscending) {
        return a.name.localeCompare(b.name);
      }
      // 기수 내림차순
      const cardinalA = a.cardinal.split('.').map(Number);
      const cardinalB = b.cardinal.split('.').map(Number);

      for (
        let i = 0;
        i < Math.max(cardinalA.length, cardinalB.length);
        i += 1
      ) {
        const numA = cardinalA[i] || 0;
        const numB = cardinalB[i] || 0;
        if (numA !== numB) {
          return numB - numA;
        }
      }

      return 0;
    });

    setFilteredMembers(sortedMembers);
  };

  return (
    <SortButtonWrapper onClick={onClickSort}>
      {isAscending ? '오름차순' : '기수 순'}
      <img src={SortIcon} alt="sorting" />
    </SortButtonWrapper>
  );
};

export default SortButton;
