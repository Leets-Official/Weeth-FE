import useGetAllUsers from '@/api/useGetAllUsers';
import MemberItem from '@/components/Member/MemberItem';
import { useSearchParams } from 'react-router-dom';
import theme from '@/styles/theme';
import styled from 'styled-components';

const List = styled.div``;

const Error = styled.div`
  display: flex;
  justify-content: center;
  font-family: ${theme.font.semiBold};
`;

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

  const { allUsers, error } = useGetAllUsers({
    cardinal: selectedCardinal,
    pageNumber: 0, // TODO: 무한스크롤 적용 후 수정
  });

  let content;

  if (error) {
    content = <Error>멤버 정보를 불러올 수 없습니다.</Error>;
  } else if (allUsers.length === 0) {
    content = <Error>{selectedCardinal}기 멤버가 존재하지 않습니다.</Error>;
  } else {
    content = allUsers.map((user: User) => (
      <MemberItem
        key={user.studentId}
        userId={user.id}
        name={user.name}
        cardinal={user.cardinals}
        position={user.position}
        role={user.role}
      />
    ));
  }

  return <List>{content}</List>;
};

export default MemberList;
