import { useEffect, useRef, useState } from 'react';
import MemberItem from '@/components/Member/MemberItem';
import { useSearchParams } from 'react-router-dom';
import theme from '@/styles/theme';
import styled from 'styled-components';
import useGetAllUsers from '@/api/useGetAllUsers';
import { User } from '@/types/user';
import Loading from '../common/Loading';

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
  loading,
}: {
  searchResults: User[] | undefined;
  loading: boolean;
}) => {
  // TODO: 조건별 컴포넌트 분리
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const isSearch = searchParams.get('search') !== null; // search parameter가 존재하면 true
  const selectedCardinal = cardinal ? Number(cardinal) : 0;

  const [pageNumber, setPageNumber] = useState(0);
  const [members, setMembers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [observerLoading, setObserverLoading] = useState(false);
  const [hasNoMember, setHasNoMember] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  console.log(pageNumber);

  useEffect(() => {
    setPageNumber(0);
    setMembers([]);
    setHasNoMember(false);
    setHasMore(true);
  }, [selectedCardinal]);

  useGetAllUsers(
    selectedCardinal,
    pageNumber,
    setMembers,
    setHasMore,
    setObserverLoading,
    setHasNoMember,
  );

  console.log('hasNomember', hasNoMember);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !observerLoading) {
          setPageNumber((prevPage) => (hasMore ? prevPage + 1 : prevPage));
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, observerLoading]);

  let content;

  if (loading) {
    content = <Loading />;
  }

  // 검색 결과가 없는 경우
  else if (isSearch && searchResults?.length === 0) {
    content = <Error>검색된 멤버가 없습니다.</Error>;
  }

  // 검색된 결과가 있는 경우
  else if (isSearch) {
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
  } else if (members.length === 0 && !hasNoMember) {
    content = <Loading />;
  } else {
    content = members.map((user: User) => (
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

  return (
    <List>
      {content}
      {hasMore && !observerLoading && !hasNoMember && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {(!hasMore && !isSearch && pageNumber !== 1) ||
        (members.length > 10 && <Error>마지막 멤버입니다.</Error>)}
      {members.length === 0 && hasNoMember && (
        <Error>{selectedCardinal}기 멤버가 존재하지 않습니다.</Error>
      )}
    </List>
  );
};

export default MemberList;
