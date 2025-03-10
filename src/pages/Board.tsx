import { useEffect, useRef, useState } from 'react';
import PostListItem from '@/components/Board/PostListItem';
import formatDate from '@/hooks/formatDate';
import { useGetBoardInfo, useGetRecentNotice } from '@/api/useGetBoardInfo';
import * as S from '@/styles/board/Board.styled';
import Header from '@/components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@/hooks/useDraggable';
import PostingButton from '@/components/Board/PostingButton';
import Loading from '@/components/common/Loading';

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

const Board = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [observerLoading, setObserverLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const { recentNotices, error } = useGetRecentNotice();

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

  const handlePosting = () => {
    navigate('/board/post');
  };

  const fetchData = async () => {
    if (!observerLoading && hasMore) {
      setObserverLoading(true);
      await useGetBoardInfo(
        path,
        pageNumber,
        setPosts,
        setHasMore,
        setObserverLoading,
      );
      setPageNumber((prevPage) => prevPage + 1);
      setObserverLoading(false);
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드
    fetchData();
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          // 추가 데이터 로드
          fetchData();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, observerLoading, pageNumber]); // 의존성 배열

  if (loading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <Header isAccessible RightButtonType="none">
        게시판
      </Header>
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
      <S.TabContainerWrapper>
        <S.TabContainer>
          <S.TabText>자유게시판</S.TabText>
          <S.Underline />
        </S.TabContainer>
      </S.TabContainerWrapper>

      {posts.map((post) => (
        <S.PostListContainer>
          <S.PostListItemContainer key={post.id}>
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
      <S.PostingButtonContainer>
        <PostingButton onClick={handlePosting} />
      </S.PostingButtonContainer>
    </S.Container>
  );
};

export default Board;
