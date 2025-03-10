import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/Board.styled';
import { useGetBoardInfo } from '@/api/useGetBoardInfo';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import PostingButton from '@/components/Board/PostingButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.gray[30]};
  margin-top: 2px;
`;

const PostList = styled.div`
  margin: 0 25px 0 25px;
`;

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
}

const Notice = () => {
  const navigate = useNavigate();
  const { isAdmin } = useGetGlobaluserInfo();

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const path = 'notices';

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          useGetBoardInfo(path, pageNumber, setPosts, setHasMore, setIsLoading);
          setPageNumber((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isLoading, pageNumber]);

  const handlePosting = () => {
    navigate('/notice/post');
  };

  return (
    <Container>
      <Header RightButtonType="none" isAccessible={false}>
        📢 공지사항
      </Header>
      {posts.map((post) => (
        <PostList key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
            hasFile={post.hasFile}
            position={post.position}
            role={post.role}
            onClick={() => navigate(`/notice/${post.id}`)}
          />
          <Line />
        </PostList>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {!hasMore && posts.length > 10 && <S.Text>마지막 게시물입니다.</S.Text>}
      {isAdmin && (
        <S.PostingButtonContainer>
          <PostingButton onClick={handlePosting} />
        </S.PostingButtonContainer>
      )}
    </Container>
  );
};

export default Notice;
