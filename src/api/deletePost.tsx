import api from '@/api/api';

const BASE_URL =
  window.location.hostname === 'weeth.site'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

const deletePost = async (postId: number, path: string) => {
  const url =
    path === 'board'
      ? `${BASE_URL}/api/v1/${path}/${postId}`
      : `${BASE_URL}/api/v1/admin/${path}/${postId}`;

  return api.delete(url);
};

export default deletePost;
