import axios from 'axios';
import { useState, useEffect } from 'react';

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

const BASE_URL = import.meta.env.VITE_API_URL;

const useGetBoardInfo = async (
  path: string,
  pageNumber: number,
  setPosts: React.Dispatch<React.SetStateAction<Content[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
    setPosts((prevPosts) => [...prevPosts, ...data.content]);
    setHasMore(!data.last);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setIsLoading(false);
  }
};

// 가장 최신 공지사항 10개를 가져오는 함수
export const useGetRecentNotice = () => {
  const [noticeInfo, setNoticeInfo] = useState<Content[]>([]);
  const [recentNoticeInfo, setRecentNoticeInfo] = useState<Content | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentNotice = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await axios.get<ApiResponse>(
          `${BASE_URL}/api/v1/notices`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Authorization_refresh: `Bearer ${refreshToken}`,
            },
            params: { pageNumber: 0, pageSize: 10 },
          },
        );
        const { content } = response.data.data;

        if (content.length > 0) {
          setRecentNoticeInfo(content[0]); // 가장 최신 공지 저장
          setNoticeInfo(content.slice(1)); // 나머지 공지 저장
        } else {
          setRecentNoticeInfo(null);
          setNoticeInfo([]);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '공지사항을 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

    fetchRecentNotice();
  }, []);

  return { noticeInfo, recentNoticeInfo, error };
};

export default useGetBoardInfo;
