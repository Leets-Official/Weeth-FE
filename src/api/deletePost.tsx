import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const deletePost = async (postId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.delete(`${BASE_URL}/api/v1/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export default deletePost;
