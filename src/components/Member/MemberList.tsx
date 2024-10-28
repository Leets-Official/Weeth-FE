import MemberName from '@/components/Member/MemberName';
import { UserContext } from '@/service/UserContext';
import { useContext } from 'react';

import * as S from '@/styles/memeber/MemberList.styled';

interface User {
  studentId: string;
  name: string;
  cardinals: number[];
  position: string;
  role: 'USER' | 'ADMIN';
}

const MemberList = ({ selectedCardinal }: { selectedCardinal: number }) => {
  const { allUserData, error } = useContext(UserContext);

  /*
  error라면 빈 배열 반환
  혹은 데이터의 값이 유효하지 않다면 빈 배열 반환
  */
  const filteredMember = error ? [] : allUserData?.[selectedCardinal] || [];

  let errorMessage;
  if (filteredMember.length === 0) {
    errorMessage = `${selectedCardinal}기 멤버가 존재하지 않습니다.`;
  } else if (error) {
    errorMessage = '멤버 정보를 불러올 수 없습니다.';
  } else errorMessage = '';

  return (
    <S.List>
      {/* filteredMember가 빈배열인가?(==error?)
          true: MemberName 렌더링
          false: ERROR
          */}
      {filteredMember.length > 0 ? (
        filteredMember.map((user: User, index: number) => (
          <MemberName
            key={user.studentId}
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
