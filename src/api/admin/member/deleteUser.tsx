import axios from 'axios';

const PATH = '/api/v1/admin/users';

const BASE_URL = import.meta.env.VITE_API_URL;

const deleteUserApi = async (userId: number | number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const userIds = Array.isArray(userId) ? userId : [userId];

  try {
    const queryParam = userIds.map((id) => `userId=${id}`).join('&');
    const url = `${BASE_URL}${PATH}?${queryParam}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '유저 추방 실패');
  }
};

export default deleteUserApi;
