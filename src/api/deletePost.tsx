import api from '@/api/api';

const BASE_URL = import.meta.env.VITE_API_URL;

const deletePost = async (postId: number, path: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const url =
    path === 'board'
      ? `${BASE_URL}/api/v1/${path}/${postId}`
      : `${BASE_URL}/api/v1/admin/${path}/${postId}`;

  return api.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Authorization-refresh': `Bearer ${refreshToken}`,
    },
  });
};

export default deletePost;
