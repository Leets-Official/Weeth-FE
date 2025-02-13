import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const deleteReceipt = async (receiptId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/admin/receipts/${receiptId}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('회비 사용 내역 삭제 실패:', error);
    throw error;
  }
};

export default deleteReceipt;
