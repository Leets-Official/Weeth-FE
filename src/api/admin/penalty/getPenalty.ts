import axios from 'axios';

const PATH = '/api/v1/admin/penalties';
const BASE_URL = import.meta.env.VITE_API_URL;

const getPenaltyApi = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(`${BASE_URL}${PATH}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 조회 실패');
  }
};

export default getPenaltyApi;
