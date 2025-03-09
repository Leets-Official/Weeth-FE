import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toastError } from '@/components/common/ToastMessage';
import api from './api';

export interface MemberDetail {
  id: number;
  name: string;
  email: string;
  studentId: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE';
  role: 'ADMIN' | 'USER';
}

export const getMemberDetail = async (userId: number) => {
  return api.get(`/api/v1/users/details`, {
    params: { userId },
  });
};

export const useGetMemberDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [memberDetail, setMemberDetail] = useState<MemberDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) throw new Error('Invalid userId');
        setLoading(true);
        const numericUserId = parseInt(userId, 10);
        const response = await getMemberDetail(numericUserId);
        setMemberDetail(response.data.data);
        setError(null);
      } catch (err: any) {
        toastError('데이터를 불러오지 못했습니다.');
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { memberDetail, error, loading };
};

export default useGetMemberDetail;
