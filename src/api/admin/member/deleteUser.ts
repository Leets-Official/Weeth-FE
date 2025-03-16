import api from '@/api/api';

const PATH = '/api/v1/admin/users';

// 유저 추방
const deleteUserApi = async (userIds: number[]) => {
  try {
    const response = await api.delete(PATH, { data: { userId: userIds } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '유저 추방 실패');
  }
};

export default deleteUserApi;
