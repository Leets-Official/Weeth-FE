import axios from 'axios';
import { AccountResponse } from '@/types/account';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

// 회비 내역 조회
const fetchAccountData = async (
  cardinal: number | null,
): Promise<AccountResponse> => {
  try {
    const response = await axios.get<AccountResponse>(
      `${BASE_URL}/api/v1/account/${cardinal}`,
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

export default fetchAccountData;
