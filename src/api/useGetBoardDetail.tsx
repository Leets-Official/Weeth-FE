import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Comments {
  id: number;
  name: string;
  content: string;
  time: string;
}

interface FileUrls {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface BoardDetail {
  id: number;
  name: string;
  title: string;
  time: string;
  commentCount: number;
  comments: Comments[];
  fileUrls: FileUrls[];
}

const getBoardDetail = async (path: string, id: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetBoardDetail = (paramsCardinal: string, id: number) => {
  const [boardDetailInfo, setBoardDetail] = useState<BoardDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await getBoardDetail(paramsCardinal, id);
        const { data } = response.data;
        setBoardDetail(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchBoardDetail();
  }, [paramsCardinal]);

  return { boardDetailInfo, error };
};

export default useGetBoardDetail;
