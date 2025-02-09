import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async (
  cardinal: number | null,
  pageNumber: number,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/users/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: {
      pageNumber,
      pageSize: 10,
      cardinal,
    },
  });
};

export const useGetAllUsers = (cardinal: number | null, pageNumber: number) => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(allUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // ✅ API 호출 시작 전에 로딩 true
      setError(null); // ✅ 새로운 요청 시작 시 error 초기화

      try {
        const response = await getAllUsers(cardinal, pageNumber);
        setAllUsers(response.data.data.content);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      } finally {
        setLoading(false); // ✅ 요청 끝나면 로딩 false
      }
    };

    fetchUsers();
  }, [cardinal, pageNumber]); // ✅ 의존성 배열 추가

  return { allUsers, error, loading };
};

export default useGetAllUsers;
