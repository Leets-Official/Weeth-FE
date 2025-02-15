import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const adminReceipts = async (data: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/receipts`,
      data,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'API 호출 중 문제가 발생했습니다.',
    );
  }
};

export default adminReceipts;
