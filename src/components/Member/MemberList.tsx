import { useEffect, useState } from 'react';
import MemberName from '@/components/Member/MemberName';
import { useSearchParams } from 'react-router-dom';
import { getAllUsers } from '@/api/getAllUsers';

import * as S from '@/styles/member/MemberList.styled';

interface User {
  name: string;
  cardinals: number[];
  studentId: number;
  department: string;
  email: string;
  position: string;
  role: 'USER' | 'ADMIN';
}

type AllUsersType = { [key: number]: User[] };

const MemberList = () => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const selectedCardinal = cardinal ? Number(cardinal) : 0;

  const [allUsers, setAllUsers] = useState<AllUsersType>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setAllUsers(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.data.message);
      }
    };

    fetchUsers();
  }, []);

  const filteredMember = allUsers[selectedCardinal] || [];

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
            name={user.name}
            cardinal={user.cardinals}
            studentId={user.studentId}
            department={user.department}
            email={user.email}
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
