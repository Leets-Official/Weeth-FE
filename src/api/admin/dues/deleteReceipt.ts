import api from '@/api/api';

const deleteReceipt = async (receiptId: number) => {
  try {
    const response = await api.delete(`/api/v1/admin/receipts/${receiptId}`);
    return response.data;
  } catch (error) {
    console.error('회비 사용 내역 삭제 실패:', error);
    throw error;
  }
};

export default deleteReceipt;
