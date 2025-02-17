import theme from '@/styles/theme';
import styled from 'styled-components';
import AddCardinal from '@/components/Admin/AddCardinal';
import { BoxWrapper } from '@/components/Admin/TotalDues';
import Box from '@/components/Admin/Box';
import useGetAllCardinals from '@/api/useGetCardinals';
import { useEffect, useState } from 'react';
import { useGetAdminUsers } from '@/api/admin/member/getAdminUser';

const CardinalBoxWrapper = styled(BoxWrapper)`
  padding: 0 0 30px 0;
  box-sizing: border-box;
`;

const TotalBox = styled(Box)`
  background-color: ${theme.color.gray[18]};
`;

const CardinalBox = styled(Box)<{ isIncomplete?: boolean }>`
  ${({ isIncomplete }) =>
    isIncomplete ? `border: 2px dashed ${theme.color.gray[18]};` : ''}
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardinalInfo: React.FC = () => {
  const { allCardinals } = useGetAllCardinals();
  const { allUsers } = useGetAdminUsers();
  const [cardinalList, setCardinalList] = useState<
    { id: number; year?: number; semester?: number; cardinalNumber: number }[]
  >([]);

  useEffect(() => {
    const sortedCardinals = [...allCardinals].sort(
      (a, b) => b.cardinalNumber - a.cardinalNumber,
    );
    setCardinalList(sortedCardinals);
  }, [allCardinals]);

  const getMemberCountByCardinal = (cardinalNumber: number) => {
    return allUsers.filter((member) =>
      member.cardinals.includes(cardinalNumber),
    ).length;
  };

  const totalMembers = allUsers.length;

  return (
    <CardinalBoxWrapper>
      <ScrollContainer>
        <AddCardinal />
        <TotalBox
          title=" "
          description="전체"
          last={`총 ${totalMembers}명`}
          color={theme.color.gray[18]}
          lastColor="#D3D3D3"
          isCardinalBox
        />
        {cardinalList.map((cardinal) => {
          const memberCount = getMemberCountByCardinal(cardinal.cardinalNumber);
          const lastText =
            cardinal.cardinalNumber <= 3
              ? `김성민 외 ${memberCount}명`
              : `노정완 외 ${memberCount}명`;

          return (
            <CardinalBox
              key={cardinal.id}
              title={`${cardinal.year}년 ${cardinal.semester}학기`}
              description={`${cardinal.cardinalNumber}기`}
              last={lastText}
              color={theme.color.gray[65]}
              lastColor="#D3D3D3"
              isCardinalBox
            />
          );
        })}
      </ScrollContainer>
    </CardinalBoxWrapper>
  );
};
export default CardinalInfo;
