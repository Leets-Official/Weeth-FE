import api from '@/api/api';
import { useState, useEffect } from 'react';

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

const BASE_URL =
  window.location.hostname === 'weeth.site'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

export const useGetBoardInfo = async (
  path: string,
  pageNumber: number,
  setPosts: React.Dispatch<React.SetStateAction<Content[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setObserverLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setObserverLoading(true);

  try {
    const response = await api.get<ApiResponse>(`${BASE_URL}/api/v1/${path}`, {
      params: { pageNumber, pageSize: 10 },
    });

    const { data } = response.data;
    setPosts((prevPosts) => [...prevPosts, ...data.content]);
    setHasMore(!data.last);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setObserverLoading(false);
  }
};

// 최신 공지사항 10개를 가져오는 훅
export const useGetRecentNotice = () => {
  const [recentNotices, setRecentNotices] = useState<Content[]>([]);
  const [recentNoticeLoading, setRecentNoticeLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentNotice = async () => {
      try {
        setRecentNoticeLoading(true);

        const response = await api.get<ApiResponse>(
          `${BASE_URL}/api/v1/notices`,
          {
            params: { pageNumber: 0, pageSize: 10 },
          },
        );

        const { content } = response.data.data;
        setRecentNotices(content);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '공지사항을 불러오는 중 오류가 발생했습니다.',
        );
      } finally {
        setRecentNoticeLoading(false);
      }
    };

    fetchRecentNotice();
  }, []);

  return { recentNotices, recentNoticeLoading, error };
};

export default useGetBoardInfo;
