import api from '@/api/api';

const PATH = '/api/v1/admin/penalties';

// 패널티 삭제
const deletePenaltyApi = async (penaltyId: number) => {
  try {
    const response = await api.delete(PATH, { params: { penaltyId } });
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
  try {
    const response = await api.patch(PATH, { penaltyId, penaltyDescription });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 수정 실패');
  }
};
export { deletePenaltyApi, patchPenaltyApi };
