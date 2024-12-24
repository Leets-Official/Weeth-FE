import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 댓글 수정 API 함수
const editComment = async (
  postId: number,
  commentId: number,
  content: string,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.patch(
    `${BASE_URL}/api/v1/posts/${postId}/comments/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export const useEditComment = (
  postId: number,
  commentId: number,
  content: string,
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId || !commentId || !content) return;

    const fetchEditComment = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await editComment(postId, commentId, content);
        setResponse(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchEditComment();
  }, [postId, commentId, content]);

  return { response, error, loading };
};

export default useEditComment;
