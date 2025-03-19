import { useEffect, useState } from 'react';
import api from './api';

export interface ImageInfo {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

export interface Receipt {
  id: number;
  amount: number;
  description: string;
  fileUrls: ImageInfo[];
  date: string;
}

interface DuesInfo {
  accountId: number;
  description: string;
  totalAmount: number;
  currentAmount: number;
  cardinal: number;
  time: string;
  receipts: Receipt[];
}

const getDuesInfo = (paramsCardinal: number) =>
  api.get(`/api/v1/account/${paramsCardinal}`).then((res) => res.data);

export const useGetDuesInfo = (paramsCardinal: number) => {
  const [duesInfo, setDuesInfo] = useState<DuesInfo | null>(null);
  const [duesError, setDuesError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paramsCardinal === 0) {
      setDuesInfo(null);
      setDuesError('기수가 올바르지 않습니다.');
      setLoading(false);
      return;
    }

    const fetchDuesInfo = async () => {
      try {
        setLoading(true);
        const data = await getDuesInfo(paramsCardinal);
        setDuesInfo(data);
        setDuesError(null);
      } catch (err: any) {
        setDuesError(
          err.response?.data?.message || '회비 정보를 불러오지 못했습니다.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDuesInfo();
  }, [paramsCardinal]);

  return { duesInfo, duesError, loading };
};

export default useGetDuesInfo;
