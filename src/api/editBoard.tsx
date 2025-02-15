import { PostRequestType } from '@/types/PostRequestType';
import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = import.meta.env.VITE_API_URL;

export const editBoard = async (data: PostRequestType, postId: number) => {
  const response = await axios.patch(
    `${BASE_URL}/api/v1/posts/${postId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      },
    },
  );
  return response;
};

export default editBoard;
