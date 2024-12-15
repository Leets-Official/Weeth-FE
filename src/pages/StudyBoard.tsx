import React, { useEffect, useRef, useState } from 'react';
import Info from '@/components/Board/Info';
import styled from 'styled-components';
import PostListItem from '@/components/Board/PostListItem';
import NoticeHeader from '@/components/Board/NoticeHeader';
import EditDelModal from '@/components/Modal/EditDelModal';
import formatDate from '@/hooks/formatDate';
import axios from 'axios';
import theme from '@/styles/theme';

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

const PostList = styled.div`
  margin: 5px 25px 0 25px;
`;

const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: Content[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

const StudyBoard = () => {
  const isPostBtn = true;

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const path = 'posts';

  const observerRef = useRef<HTMLDivElement | null>(null);

  // API 데이터 가져오기
  const fetchMoreItems = async () => {
    // 중복 호출 방지
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      console.log('Fetching page:', pageNumber);
      const response = await axios.get<ApiResponse>(
        `${BASE_URL}/api/v1/${path}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
          params: { pageNumber, pageSize: 10 },
        },
      );

      const { data } = response.data;

      // 데이터 병합
      setPosts((prevPosts) => [...prevPosts, ...data.content]);
      // 마지막 페이지 여부 설정
      setHasMore(!data.last);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          fetchMoreItems();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, isLoading]);

  return (
    <Container>
      <NoticeHeader showModal={false} ModalComponent={EditDelModal} />
      <Info title="스터디 게시판" isEditButtonVisible={isPostBtn} />
      {posts.map((post) => (
        <PostList key={post.id}>
          <PostListItem
            name={post.name}
            time={formatDate(post.time)}
            title={post.title}
            content={post.content}
            totalComments={post.commentCount}
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
      {isLoading && <Text>로딩 중...</Text>}
      {!hasMore && <Text>마지막 게시물입니다.</Text>}
    </Container>
  );
};

export default StudyBoard;
