import useGetAllUsers from '@/api/useGetAllUsers';
import MemberName from '@/components/Member/MemberName';
import * as S from '@/styles/member/MemberList.styled';
import { useSearchParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  cardinals: number[];
  studentId: number;
  department: string;
  email: string;
  position: string;
  role: 'USER' | 'ADMIN';
}

const MemberList = () => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const selectedCardinal = cardinal ? Number(cardinal) : 0;

  const { allUsers, error, loading } = useGetAllUsers(null, 0);

  let content;

  if (loading) {
    content = <S.Error>로딩 중...</S.Error>;
  } else if (error) {
    content = <S.Error>멤버 정보를 불러올 수 없습니다.</S.Error>;
  } else if (allUsers.length === 0) {
    content = <S.Error>{selectedCardinal}기 멤버가 존재하지 않습니다.</S.Error>;
  } else {
    content = allUsers.map((user: User, index: number) => (
      <MemberName
        key={user.studentId}
        userId={user.id}
        name={user.name}
        cardinal={user.cardinals}
        position={user.position}
        role={user.role}
        isLast={index === allUsers.length - 1} // 마지막 요소에만 isLast prop 전달
      />
    ));
  }

  return <S.List>{content}</S.List>;
};

export default MemberList;
