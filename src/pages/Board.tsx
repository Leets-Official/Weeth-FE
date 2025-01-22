import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import theme from '@/styles/theme';
import useGetBoardInfo, { useGetRecentNotice } from '@/api/useGetBoardInfo';
import * as S from '@/styles/board/BoardPost.styled';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@/hooks/useDraggable';

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

const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

const PostListContainer = styled.div`
  margin: 0px 25px 0 25px;
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
}

const Board = () => {
  const navigate = useNavigate();
  // const isPostButtonVisible = true;

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { recentNotices, error } = useGetRecentNotice();

  const path = 'posts';

  const observerRef = useRef<HTMLDivElement | null>(null);

  const scrollerRef1 = useRef<HTMLDivElement | null>(null);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);

  const handleNoticeCard = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.preventDefault();
    navigate(`/notice/${id}`);
  };

  const handleAllNotice = () => {
    navigate('/notice');
  };

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

  console.log(posts);

  return (
    <Container>
      <Header title="게시판" RightButtonType="none" />
      <S.NoticeTextContainer>
        <S.NoticeTitleText>📢 공지사항</S.NoticeTitleText>
        <S.AllText onClick={handleAllNotice}>전체보기 &gt;</S.AllText>
      </S.NoticeTextContainer>
      {error ? (
        <div>에러</div>
      ) : (
        <S.ScrollContainer
          ref={scrollerRef1}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {recentNotices.map((notice) => (
            <S.NoticeCard
              key={notice.id}
              onClick={(e) => handleNoticeCard(e, notice.id)}
            >
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
              <S.NoticeContent>{notice.content}</S.NoticeContent>
            </S.NoticeCard>
          ))}
        </S.ScrollContainer>
      )}

      {posts.map((post) => (
        <PostListContainer key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
            hasFile={post.hasFile}
            position={post.position}
            onClick={() => navigate(`/board/${post.id}`)}
          />
          <Line />
        </PostListContainer>
      ))}
      {hasMore && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}
      {isLoading && <Text>로딩 중...</Text>}
      {!hasMore && <Text>마지막 게시물입니다.</Text>}
    </Container>
  );
};

export default Board;
