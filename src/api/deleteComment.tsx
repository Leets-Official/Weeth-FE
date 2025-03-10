import api from '@/api/api';

const BASE_URL = import.meta.env.VITE_API_URL;

const deleteComment = async (
  path: string,
  postId: number,
  commentId: number,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return api.delete(
    `${BASE_URL}/api/v1/${path}/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      },
    },
  );
};

export default deleteComment;
