import MemberItem from '@/components/Member/MemberItem';
import { useSearchParams } from 'react-router-dom';
import theme from '@/styles/theme';
import styled from 'styled-components';
import useGetAllUsers from '@/api/useGetAllUsers';
import { User } from '@/types/user';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Error = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-family: ${theme.font.semiBold};
`;

const MemberList = ({
  searchResults,
}: {
  searchResults: User[] | undefined;
}) => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const isSearch = searchParams.get('search') !== null; // search parameter가 존재하면 true
  const selectedCardinal = cardinal ? Number(cardinal) : 0;

  const { allUsers, error } = useGetAllUsers({
    cardinal: selectedCardinal,
    pageNumber: 0, // TODO: 무한스크롤 적용 후 수정
  });

  let content;

  if (error) {
    content = <Error>멤버 정보를 불러올 수 없습니다.</Error>;
  } else if (isSearch) {
    if (isSearch && searchResults?.length === 0) {
      content = <Error>검색된 멤버가 없습니다.</Error>;
    } else {
      content = searchResults?.map((user: User) => (
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
  } else {
    // eslint-disable-next-line no-lonely-if
    if (allUsers.length === 0) {
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
  }

  return <List>{content}</List>;
};

export default MemberList;
