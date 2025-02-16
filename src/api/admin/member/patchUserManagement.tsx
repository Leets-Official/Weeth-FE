import axios from 'axios';

const PATH = '/api/v1/admin/users';
const BASE_URL = import.meta.env.VITE_API_URL;

// PATCH 공통함수
const sendPatchRequest = async (
  endpoint: string,
  body: object,
  errorMessage: string,
) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const url = `${BASE_URL}${PATH}${endpoint}`;
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || errorMessage);
  }
};

// 비밀번호 초기화
const resetPwdApi = async (userIds: number[]) => {
  return sendPatchRequest(
    '/reset',
    { userId: userIds },
    '비밀번호 초기화 실패',
  );
};

// 가입 신청 승인
const approveSignupApi = async (userIds: number[]) => {
  return sendPatchRequest('', { userId: userIds }, '가입 승인 실패');
};

// 관리자로 승격/강등
const changeUserRoleApi = async (
  users: { userId: number; role: 'ADMIN' | 'USER' }[],
) => {
  return sendPatchRequest('/role', users, '역할 변경 실패');
};

export { resetPwdApi, approveSignupApi, changeUserRoleApi };
