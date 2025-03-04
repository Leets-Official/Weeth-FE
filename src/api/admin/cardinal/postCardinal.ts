import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const PATH = '/api/v1/admin/cardinals';

// 새로운 기수 등록
const postCardinalApi = async (
  cardinalNumber: number,
  year: number,
  semester: number,
  inProgress: boolean,
) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      `${BASE_URL}${PATH}`,
      { cardinalNumber, year, semester, inProgress },
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

// 기수 수정
const patchCardinalApi = async (
  id: number,
  year: number,
  semester: number,
  inProgress: boolean,
) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await axios.patch(
      `${BASE_URL}${PATH}`,
      { id, year, semester, inProgress },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '기수 수정 실패');
  }
};

export { patchCardinalApi, postCardinalApi };
