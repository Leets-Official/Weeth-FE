import axios from 'axios';

const PATH = '/api/v1/admin/users';

const BASE_URL = import.meta.env.VITE_API_URL;

// 비밀번호 초기화
const resetPwdApi = async (userId: number | number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const userIds = Array.isArray(userId) ? userId : [userId];

  try {
    const queryParam = userIds.map((id) => `userId=${id}`).join('&');
    const url = `${BASE_URL}${PATH}/reset?${queryParam}`;
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
    throw new Error(error.response?.data?.message || '비밀번호 초기화 실패');
  }
};

// 가입 신청 승인
const approveSignupApi = async (userId: number | number[]) => {
  const accessToken = localStorage.getItem('accessToken');
  const userIds = Array.isArray(userId) ? userId : [userId];

  try {
    const queryParam = userIds.map((id) => `userId=${id}`).join('&');
    const url = `${BASE_URL}${PATH}?${queryParam}`;
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
    throw new Error(error.response?.data?.message || '가입 승인 실패');
  }
};

// 관리자로 승격/강등
const changeUserRoleApi = async (userId: number, role: 'ADMIN' | 'USER') => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const url = `${BASE_URL}${PATH}/role?userId=${userId}&role=${role}`;
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
    throw new Error(error.response?.data?.message || '역할 변경 실패');
  }
};

export { resetPwdApi, approveSignupApi, changeUserRoleApi };
