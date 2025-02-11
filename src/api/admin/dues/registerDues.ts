import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

export interface DuesRegisterRequest {
  cardinal: number;
  description: string;
  totalAmount: number;
}

// 회비 총 금액 기입
export const registerDues = async (
  data: DuesRegisterRequest,
): Promise<void> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/account`,
      data,
      {
        headers: {
          Authorization: `Bearer ${ACCESSTOKEN}`,
        },
      },
    );

    if (response.status === 200) {
      alert('회비가 성공적으로 등록되었습니다.');
    }
  } catch (error: any) {
    alert(
      `등록 중 오류 발생: ${error.response?.data?.message || error.message}`,
    );
  }
};
