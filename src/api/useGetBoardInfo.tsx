import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Content {
  id: number;
  name: string;
  title: string;
  time: string;
  content: string;
  commentCount: number;
}

interface BoardInfo {
  last: boolean;
  content: Content[];
}

const getBoardInfo = async (path: string, page: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: { pageNumber: page, pageSize: 5 },
  });
};

export const useGetBoardInfo = (path: string, page: number) => {
  const [boardInfo, setBoardInfo] = useState<BoardInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardInfo = async () => {
      try {
        const response = await getBoardInfo(path, page);
        const { data } = response.data;
        setBoardInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchBoardInfo();
  }, [path]);

  return { boardInfo, error };
};

export default useGetBoardInfo;
