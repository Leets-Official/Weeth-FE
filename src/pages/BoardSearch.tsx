/* eslint-disable no-nested-ternary */
import Header from '@/components/Header/Header';
import theme from '@/styles/theme';
import PostListItem from '@/components/Board/PostListItem';
import { useState } from 'react';
import styled from 'styled-components';
import search from '@/assets/images/ic_search.svg';
import * as S from '@/styles/board/Board.styled';
import useGetBoardSearch from '@/api/useGetBoardSearch';
import useCustomBack from '@/hooks/useCustomBack';
import Loading from '@/components/common/Loading';
import { useNavigate } from 'react-router-dom';
import formatDate from '@/hooks/formatDate';
import { toastError } from '@/components/common/ToastMessage';
import DividerLine from '@/assets/images/ic_search_divider.svg';
import Delete from '@/assets/images/ic_circle_close.svg';
import { BoardContent } from './Board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 23.125rem;
  max-width: 23.125rem;
  padding-bottom: 3.125rem;
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 0.25rem;
  padding: 0.4375rem 0.75rem;
  margin-top: 1.25rem;
  width: 21.5625rem;
  box-sizing: border-box;
  transition: border 0.2s;

  &:focus-within {
    border: 1px solid ${theme.color.gray[65]};
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: #fff;
  padding: 0;
  width: 14.375rem;

  &::placeholder {
    font-size: 1rem;
    color: ${theme.color.gray[65]};
  }
`;

const Divider = styled.img`
  margin: 0 0.75rem;
`;

const SearchButton = styled.img<{ disabled?: boolean }>`
  cursor: pointer;
  filter: ${(props) =>
    props.disabled
      ? 'brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(93%) contrast(86%)'
      : 'none'};
`;

const TotalSearch = styled.div`
  margin: 0.9375rem 0 0 1.4375rem;
  font-size: 0.75rem;
  color: ${theme.color.gray[65]};
  align-self: start;
`;

const NoResultBox = styled.div`
  margin: 0.9375rem 0;
  width: 21.5625rem;
  height: 3.9375rem;
  border: none;
  border-radius: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.color.gray[65]};
  background-color: ${theme.color.gray[18]};
`;

const BoardSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState<BoardContent[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useCustomBack('/board');

  const fetchData = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      await useGetBoardSearch(keyword, 0, (newPosts) => {
        setPosts(newPosts);
      });
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setIsSearched(true);
    setPosts([]);
    fetchData();
  };

  const handleDelete = () => {
    setKeyword('');
    setPosts([]);
    setIsSearched(false);
  };

  return (
    <Container>
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
        <div>
          {keyword && (
            <SearchButton
              src={Delete}
              alt="검색어 삭제"
              onClick={handleDelete}
            />
          )}
          <Divider src={DividerLine} alt="구분선" />
          <SearchButton
            src={search}
            alt="search"
            onClick={handleSearch}
            disabled={!keyword}
          />
        </div>
      </Search>

      {!isSearched || (isSearched && posts.length === 0) ? (
        <>
          <TotalSearch>
            찾으려는 게시판의 제목이나 내용을 작성하고 검색하세요.
          </TotalSearch>
          {isSearched && posts.length === 0 && !loading && (
            <NoResultBox>검색 결과가 없습니다</NoResultBox>
          )}
        </>
      ) : (
        <TotalSearch>검색 결과 {posts.length}개</TotalSearch>
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default BoardSearch;
