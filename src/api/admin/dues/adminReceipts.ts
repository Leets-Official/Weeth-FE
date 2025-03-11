import api from '@/api/api';

const adminReceipts = async (data: any) => {
  try {
    const response = await api.post(`/api/v1/admin/receipts`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;

      if (status === 404) {
        throw new Error('존재하지 않는 총회비 정보입니다.');
      } else if (status === 400 || status === 500) {
        throw new Error('등록 중 오류가 발생했습니다.');
      }
    }
    throw new Error('API 호출 중 문제가 발생했습니다.');
  }
};

export default adminReceipts;
