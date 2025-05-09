import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '@/api/admin/member/getAdminUser';
import formatDate from '@/utils/admin/dateUtils';
import useGetAllCardinals from '@/api/useGetCardinals';
import getHighestCardinal from '@/utils/admin/getHighestCardinal';
import useGetUserInfo from '@/api/useGetGlobaluserInfo';

export type MemberData = {
  id: number;
  status: '승인 완료' | '대기 중' | '추방';
  name: string;
  role: string;
  department: string;
  cardinals: number[];
  tel: string;
  studentId: string;
  position: string;
  attendanceCount: number;
  absenceCount: number;
  penaltyCount: number;
  LatestPenalty?: string;
  createdAt: string;
  email?: string;
  membershipType?: '활동 중' | '알럼나이' | '상태 없음';
};

interface MemberContextProps {
  members: MemberData[]; // 전체 멤버 데이터
  setMembers: React.Dispatch<React.SetStateAction<MemberData[]>>;
  selectedMembers: string[]; // 선택된 멤버 ID 리스트
  filteredMembers: MemberData[];
  setSelectedMembers: React.Dispatch<React.SetStateAction<string[]>>;
  setFilteredMembers: React.Dispatch<React.SetStateAction<MemberData[]>>;
  sortingOrder: 'NAME_ASCENDING' | 'CARDINAL_DESCENDING';
  setSortingOrder: React.Dispatch<
    React.SetStateAction<'NAME_ASCENDING' | 'CARDINAL_DESCENDING'>
  >;
  selectedCardinal: number | null;
  setSelectedCardinal: React.Dispatch<React.SetStateAction<number | null>>;
}

// context 생성
const MemberContext = createContext<MemberContextProps | undefined>(undefined);

// provider를 통해 상태와 업데이트 함수 전달
export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);

  const [members, setMembers] = useState<MemberData[]>([]);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>(members);
  const [sortingOrder, setSortingOrder] = useState<
    'NAME_ASCENDING' | 'CARDINAL_DESCENDING'
  >('NAME_ASCENDING');

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);

  const statusMapping: Record<string, string> = {
    ACTIVE: '승인 완료',
    WAITING: '대기 중',
    BANNED: '추방',
  };

  const { allCardinals } = useGetAllCardinals();
  const currentCardinal =
    allCardinals.find((c) => c.status === 'IN_PROGRESS')?.cardinalNumber ||
    null;

  const { isAdmin, loading } = useGetUserInfo();

  useEffect(() => {
    if (loading || isAdmin === undefined || !isAdmin) {
      return;
    }
    const fetchMembers = async () => {
      try {
        const response = await getAllUsers(sortingOrder);
        const fetchedMembers = response.data.data || [];

        const mappedMembers = fetchedMembers.map((user: any) => {
          const highestMemberCardinalStr = getHighestCardinal(user.cardinals);
          const highestMemberCardinal = parseInt(highestMemberCardinalStr, 10);

          let membershipType: '활동 중' | '알럼나이' | '상태 없음';

          if (Number.isNaN(highestMemberCardinal)) {
            membershipType = '상태 없음';
          } else if (highestMemberCardinal === currentCardinal) {
            membershipType = '활동 중';
          } else {
            membershipType = '알럼나이';
          }

          return {
            ...user,
            cardinals:
              user.cardinals.length > 0 ? user.cardinals.join('.') : '',
            status: statusMapping[user.status] || '대기 중',
            attendanceCount: user.attendanceCount ?? 0,
            absenceCount: user.absenceCount ?? 0,
            penaltyCount: user.penaltyCount ?? 0,
            createdAt: formatDate(user.createdAt),
            membershipType,
          };
        });

        setMembers(mappedMembers);
        setFilteredMembers(mappedMembers);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '데이터 불러오기 실패');
      }
    };

    fetchMembers();
  }, [sortingOrder, isAdmin, loading]);

  useEffect(() => {
    if (loading || isAdmin === undefined || !isAdmin) {
      return;
    }
    if (selectedCardinal === null) {
      setFilteredMembers(members);
      return;
    }

    const filtered = members.filter((member) => {
      return member.cardinals.includes(selectedCardinal);
    });

    setFilteredMembers(filtered);
  }, [selectedCardinal, members]);

  const value = useMemo(
    () => ({
      members,
      setMembers,
      selectedMembers,
      setSelectedMembers,
      filteredMembers,
      setFilteredMembers,
      sortingOrder,
      setSortingOrder,
      selectedCardinal,
      setSelectedCardinal,
    }),
    [members, selectedMembers, filteredMembers, selectedCardinal, error],
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error(
      'useMemberContext는 MemberProvider 내에서만 사용할 수 있습니다',
    );
  }
  return context;
};
