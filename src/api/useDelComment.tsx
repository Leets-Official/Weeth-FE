import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const deleteComment = async (path: string, id: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.delete(`${BASE_URL}/api/v1/${path}/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useDeleteComment = (path: string, id: number) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // path와 id 유효성 검사
    if (!path || !id) return;

    const fetchDeleteComment = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await deleteComment(path, id);
        setResponse(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDeleteComment();
  }, [path, id]);

  return { response, error, loading };
};

export default useDeleteComment;
