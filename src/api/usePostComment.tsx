import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 댓글 작성 API 함수
const createComment = async (
  postId: number,
  parentCommentId: number,
  content: string,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.post(
    `${BASE_URL}/api/v1/posts/${postId}/comments`,
    { parentCommentId, content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const useCreateComment = (
  postId: number,
  parentCommentId: number,
  content: string,
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId || !content) return;

    const fetchCreateComment = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await createComment(postId, parentCommentId, content);
        setResponse(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCreateComment();
  }, [postId, parentCommentId, content]);

  return { response, error, loading };
};

export default useCreateComment;
