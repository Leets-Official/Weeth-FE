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

  const { allUsers, error } = useGetAllUsers();

  const filteredMember = (allUsers[selectedCardinal] || []) as User[];

  let errorMessage;
  if (filteredMember.length === 0) {
    errorMessage = `${selectedCardinal}기 멤버가 존재하지 않습니다.`;
  } else if (error) {
    errorMessage = '멤버 정보를 불러올 수 없습니다.';
  } else {
    errorMessage = '';
  }

  return (
    <S.List>
      {filteredMember.length > 0 ? (
        filteredMember.map((user: User, index: number) => (
          <MemberName
            key={user.studentId}
            userId={user.id}
            name={user.name}
            cardinal={user.cardinals}
            position={user.position}
            role={user.role}
            isLast={index === filteredMember.length - 1} // 마지막 요소에만 isLast prop 전달
          />
        ))
      ) : (
        <S.Error>{errorMessage}</S.Error>
      )}
    </S.List>
  );
};

export default MemberList;
