import axios from 'axios';

const PATH = '/api/v1/admin/users';
const BASE_URL = import.meta.env.VITE_API_URL;

// PATCH 공통함수
const sendPatchRequest = async (
  endpoint: string,
  params: string,
  errorMessage: string,
) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const url = `${BASE_URL}${PATH}${endpoint}?${params}`;
    const response = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || errorMessage);
  }
};

// 비밀번호 초기화
const resetPwdApi = async (userId: number | number[]) => {
  const userIds = Array.isArray(userId) ? userId : [userId];
  const queryParam = userIds.map((id) => `userId=${id}`).join('&');
  return sendPatchRequest('/reset', queryParam, '비밀번호 초기화 실패');
};

// 가입 신청 승인
const approveSignupApi = async (userId: number | number[]) => {
  const userIds = Array.isArray(userId) ? userId : [userId];
  const queryParam = userIds.map((id) => `userId=${id}`).join('&');
  return sendPatchRequest('', queryParam, '가입 승인 실패');
};

// 관리자로 승격/강등
const changeUserRoleApi = async (userId: number, role: 'ADMIN' | 'USER') => {
  const queryParam = `userId=${userId}&role=${role}`;
  return sendPatchRequest('/role', queryParam, '역할 변경 실패');
};

export { resetPwdApi, approveSignupApi, changeUserRoleApi };
