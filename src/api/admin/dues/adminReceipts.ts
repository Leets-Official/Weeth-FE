import api from '@/api/api';

const adminReceipts = async (data: any) => {
  try {
    const response = await api.post(`/api/v1/admin/receipts`, data);
    console.log('?', response);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'API 호출 중 문제가 발생했습니다.',
    );
  }
};

export default adminReceipts;
