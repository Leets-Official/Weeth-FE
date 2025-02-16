import axios from 'axios';

const PATH = '/api/v1/admin/users';

const BASE_URL = import.meta.env.VITE_API_URL;

// 유저 추방
const deleteUserApi = async (userIds: number[]) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const url = `${BASE_URL}${PATH}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { userId: userIds },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '유저 추방 실패');
  }
};

export default deleteUserApi;
