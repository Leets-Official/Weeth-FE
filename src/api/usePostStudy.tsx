import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = import.meta.env.VITE_API_URL;

export interface File {
  fileName: string;
  fileUrl: string;
}

export interface PostRequestType {
  title: string;
  content: string;
  files: File[];
}

export const createStudy = async (data: PostRequestType) => {
  const response = await axios.post(`${BASE_URL}/api/v1/posts`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
  return response;
};

export default createStudy;
