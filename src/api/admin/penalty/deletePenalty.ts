import axios from 'axios';

const PATH = '/api/v1/admin/penalties';
const BASE_URL = import.meta.env.VITE_API_URL;

// 패널티 삭제
const deletePenaltyApi = async (penaltyId: number) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(`${BASE_URL}${PATH}`, {
      params: { penaltyId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 삭제 실패');
  }
};

// 패널티 수정
const patchPenaltyApi = async (
  penaltyId: number,
  penaltyDescription: string,
) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.patch(
      `${BASE_URL}${PATH}`,
      { penaltyId, penaltyDescription },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 수정 실패');
  }
};
export { deletePenaltyApi, patchPenaltyApi };
