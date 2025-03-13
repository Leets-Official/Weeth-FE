import api from '@/api/api';

const PATH = '/api/v1/admin/cardinals';

// 새로운 기수 등록
const postCardinalApi = async (
  cardinalNumber: number,
  year: number,
  semester: number,
  inProgress: boolean,
) => {
  try {
    const response = await api.post(PATH, {
      cardinalNumber,
      year,
      semester,
      inProgress,
    });

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
  try {
    const response = await api.patch(PATH, { id, year, semester, inProgress });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '기수 수정 실패');
  }
};

export { patchCardinalApi, postCardinalApi };
