import { useSearchParams } from 'react-router-dom';
import MemberName from '@/components/Member/MemberName';
import { UserContext } from '@/service/UserContext';
import { useContext } from 'react';

import * as S from '@/styles/memeber/MemberList.styled';

interface User {
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

  const { allUserData, error } = useContext(UserContext);

  // 데이터가 없거나 오류가 있으면 빈 배열 반환
  const filteredMember = error ? [] : allUserData?.[selectedCardinal] || [];

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
