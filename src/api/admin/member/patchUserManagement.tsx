import axios from 'axios';

const PATH = '/api/v1/admin/users';

const BASE_URL = import.meta.env.VITE_API_URL;

// 비밀번호 초기화
const resetPwdApi = async (userId: number | number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userIds = Array.isArray(userId) ? userId : [userId];

  try {
    const queryParam = userIds.map((id) => `userId=${id}`).join('&');
    const url = `${BASE_URL}${PATH}/reset?${queryParam}`;
    const response = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '비밀번호 초기화 실패');
  }
};

export default resetPwdApi;
