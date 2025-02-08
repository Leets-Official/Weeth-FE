import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '@/api/getAdminUser';

export type MemberData = {
  id: number;
  status: '승인 완료' | '대기 중' | '추방';
  name: string;
  role: string;
  department: string;
  cardinals: string;
  tel: string;
  studentId: string;
  position: string;
  attendanceCount: number;
  absenceCount: number;
  penaltyCount: number;
  LatestPenalty?: string;
  createAt: string;
  email?: string;
  membershipType?: string;
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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getAllUsers(sortingOrder);
        const fetchedMembers = response.data.data || [];
        console.log('API응답: ', response.data);
        setMembers(fetchedMembers);
        setFilteredMembers(fetchedMembers);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || '데이터 불러오기 실패');
      }
    };

    fetchMembers();
  }, [sortingOrder]);
  const value = useMemo(
    () => ({
      members,
      setMembers,
      selectedMembers,
      setSelectedMembers,
      filteredMembers,
      setFilteredMembers,
    }),
    [members, selectedMembers, filteredMembers, error],
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
