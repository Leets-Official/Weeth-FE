import theme from '@/styles/theme';
import * as S from '@/styles/admin/cardinal/CardinalInfo.styled';
import AddCardinal from '@/components/Admin/AddCardinal';
import useGetAllCardinals from '@/api/useGetCardinals';
import { useEffect, useState } from 'react';
import { useGetAdminUsers } from '@/api/admin/member/getAdminUser';
import { useMemberContext } from './context/MemberContext';

const CardinalInfo: React.FC = () => {
  const { selectedCardinal, setSelectedCardinal } = useMemberContext();
  const { allCardinals } = useGetAllCardinals();
  const { allUsers } = useGetAdminUsers();
  const [currentEditingCardinal, setCurrentEditingCardinal] = useState<{
    id: number;
    cardinalNumber: number;
  } | null>(null);
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

  const handleCardinalClick = (cardinal: {
    id: number;
    year?: number;
    semester?: number;
    cardinalNumber: number;
  }) => {
    console.log('클릭된 기수:', cardinal.cardinalNumber);
    if (!cardinal.year || !cardinal.semester) {
      setCurrentEditingCardinal(cardinal);
      // setIsModalOpen(true)
    } else {
      setSelectedCardinal(cardinal.cardinalNumber);
    }
  };
  return (
    <S.CardinalBoxWrapper>
      <S.ScrollContainer>
        <AddCardinal />
        <S.TotalBox
          title=" "
          description="전체"
          last={`총 ${totalMembers}명`}
          color={theme.color.gray[18]}
          lastColor="#D3D3D3"
          isCardinalBox
          isClick
          onClick={() => setSelectedCardinal(null)}
        />
        {cardinalList.map((cardinal) => {
          const memberCount = getMemberCountByCardinal(cardinal.cardinalNumber);
          const lastText =
            cardinal.cardinalNumber <= 3
              ? `김성민 외 ${memberCount}명`
              : `노정완 외 ${memberCount}명`;

          return (
            <S.CardinalBox
              key={cardinal.id}
              title={`${cardinal.year}년 ${cardinal.semester}학기`}
              description={`${cardinal.cardinalNumber}기`}
              last={lastText}
              color={theme.color.gray[65]}
              lastColor="#D3D3D3"
              isCardinalBox
              isClick
              isSelected={selectedCardinal === cardinal.cardinalNumber}
              onClick={() => handleCardinalClick(cardinal)}
            />
          );
        })}
      </S.ScrollContainer>
    </S.CardinalBoxWrapper>
  );
};
export default CardinalInfo;
