import Header from '@/components/Header/Header';
import theme from '@/styles/theme';
import PostListItem from '@/components/Board/PostListItem';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import search from '@/assets/images/ic_search.svg';
import * as S from '@/styles/board/Board.styled';
import useGetBoardSearch from '@/api/useGetBoardSearch';
import useCustomBack from '@/hooks/useCustomBack';
import Loading from '@/components/common/Loading';
import { useNavigate } from 'react-router-dom';
import formatDate from '@/hooks/formatDate';
import { BoardContent } from './Board';
import { toastError } from '@/components/common/ToastMessage';

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 4px;
  padding: 7px 10px;
  margin-top: 20px;
  width: 345px;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  padding: 0;
  width: 211px;
  margin-left: 10px;

  &::placeholder {
    font-size: 16px;
    color: ${theme.color.gray[65]};
  }
`;

const SearchButton = styled.img`
  cursor: pointer;
`;

const TotalSearch = styled.div`
  margin: 15px 0 0 15px;
  font-size: 12px;
  color: ${theme.color.gray[65]};
`;

const BoardSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState<BoardContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [observerLoading, setObserverLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useCustomBack('/board');

  const handleSearch = async () => {
    setLoading(true);
    try {
      await useGetBoardSearch(
        keyword,
        pageNumber,
        setPosts,
        setHasMore,
        setObserverLoading,
      );
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(posts);

  // const isFetchingRef = useRef(false);

  // const fetchData = async () => {
  //   if (isFetchingRef.current || !hasMore) return;

  //   isFetchingRef.current = true;

  //   await useGetBoardSearch(
  //     keyword,
  //     pageNumber,
  //     setPosts,
  //     setHasMore,
  //     setObserverLoading,
  //   );

  //   isFetchingRef.current = false;
  //   if (loading) setLoading(false);
  // };

  // useEffect(() => {
  //   if (pageNumber === 0 && !loading) return; // 초기 진입 시 제외
  //   fetchData();
  // }, [pageNumber]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const firstEntry = entries[0];
  //       if (firstEntry.isIntersecting && hasMore && !isFetchingRef.current) {
  //         setPageNumber((prev) => prev + 1);
  //       }
  //     },
  //     { root: null, rootMargin: '0px', threshold: 0.1 },
  //   );

  //   if (observerRef.current) observer.observe(observerRef.current);

  //   return () => {
  //     if (observerRef.current) observer.unobserve(observerRef.current);
  //   };
  // }, [hasMore, observerLoading]);

  if (loading) return <Loading />;

  return (
    <div>
      <Header RightButtonType="none" isAccessible>
        게시판 검색
      </Header>
      <Search>
        <SearchInput
          placeholder="제목, 내용 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <SearchButton src={search} alt="search" onClick={handleSearch} />
      </Search>
      <TotalSearch>검색 결과 {posts.length}개</TotalSearch>
      {posts.map((post) => (
        <S.PostListContainer key={post.id}>
          <S.PostListItemContainer>
            <PostListItem
              name={post.name}
              time={formatDate(post.time)}
              title={post.title}
              content={post.content}
              totalComments={post.commentCount}
              hasFile={post.hasFile}
              position={post.position}
              role={post.role}
              onClick={() => navigate(`/board/${post.id}`)}
            />
          </S.PostListItemContainer>
          <S.Line />
        </S.PostListContainer>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {!hasMore && posts.length > 10 && <S.Text>마지막 게시물입니다.</S.Text>}
    </div>
  );
};

export default BoardSearch;
