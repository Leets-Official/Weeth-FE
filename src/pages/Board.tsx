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
  margin-top: 10px;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

const PostListContainer = styled.div`
  margin: 5px 25px 0 25px;
`;

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

const Board = () => {
  const navigate = useNavigate();
  // const isPostButtonVisible = true;

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { noticeInfo, recentNoticeInfo, error } = useGetRecentNotice();

  console.log(noticeInfo, 'dfs', recentNoticeInfo);
  const path = 'posts';

  const observerRef = useRef<HTMLDivElement | null>(null);

  const scrollerRef1 = useRef<HTMLDivElement | null>(null);

  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef1);

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

  return (
    <Container>
      <Header title="게시판" RightButtonType="none" />
      <S.NoticeTextContainer>
        <S.NoticeTitleText>📢 공지사항</S.NoticeTitleText>
        <S.AllText>전체보기 &gt;</S.AllText>
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
          <S.NoticeCard href="#">
            <S.NoticeTitle>미션 제출 마지막 날입니다.</S.NoticeTitle>
            <S.NoticeContent>
              여러분 안녕하세요! 기말고사 시즌이 다가오고 있습니다.
            </S.NoticeContent>
          </S.NoticeCard>

          <S.NoticeCard href="#">
            <S.NoticeTitle>미션 제출 마지막 날입니다.</S.NoticeTitle>
            <S.NoticeContent>
              여러분 안녕하세요! 기말고사 시즌이 다가오고 있습니다.
            </S.NoticeContent>
          </S.NoticeCard>
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
            onClick={() => navigate(`/study/${post.id}`)}
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
