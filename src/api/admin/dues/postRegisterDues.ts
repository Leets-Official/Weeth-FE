import api from '@/api/api';

export interface DuesRegisterRequest {
  cardinal: number;
  description: string;
  totalAmount: number;
}

export const registerDues = async (
  data: DuesRegisterRequest,
): Promise<void> => {
  try {
    const response = await api.post(`/api/v1/admin/account`, data);

    if (response.status === 200) {
      alert('회비가 성공적으로 등록되었습니다.');
    }
  } catch (error: any) {
    alert(
      `등록 중 오류 발생: ${error.response?.data?.message || error.message}`,
    );
  }
};
