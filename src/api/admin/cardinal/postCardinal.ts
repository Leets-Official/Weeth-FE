import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const PATH = '/api/v1/admin/cardinals';

const postCardinalApi = async (
  cardinalNumber: number,
  year: number,
  semester: number,
) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      `${BASE_URL}${PATH}`,
      { cardinalNumber, year, semester },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '새로운 기수 저장 실패');
  }
};

export default postCardinalApi;
