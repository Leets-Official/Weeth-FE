import api from '@/api/api';
import { AccountResponse } from '@/types/account';

const fetchAccountData = async (
  cardinal: number | null,
): Promise<AccountResponse> => {
  try {
    const response = await api.get<AccountResponse>(
      `/api/v1/account/${cardinal}`,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'API 호출 중 문제가 발생했습니다.',
    );
  }
};

export default fetchAccountData;
