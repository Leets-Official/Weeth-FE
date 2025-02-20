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

// 유저 정보 받아오는 API
const getDuesInfo = async (paramsCardinal: number) => {
  return api.get(`/api/v1/account/${paramsCardinal}`);
};

export const useGetDuesInfo = (paramsCardinal: number) => {
  const [duesInfo, setDuesInfoInfo] = useState<DuesInfo | null>(null);
  const [DuesError, setError] = useState<string | null>(null);

  useEffect(() => {
    if (paramsCardinal === 0) return;

    const fetchDuesInfo = async () => {
      try {
        const response = await getDuesInfo(paramsCardinal);
        const { data } = response.data;
        setDuesInfoInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchDuesInfo();
  }, [paramsCardinal]);

  return { duesInfo, DuesError };
};

export default useGetDuesInfo;
