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

const getDuesInfo = async (paramsCardinal: number) => {
  return api.get(`/api/v1/account/${paramsCardinal}`);
};

export const useGetDuesInfo = (paramsCardinal: number) => {
  const [duesInfo, setDuesInfoInfo] = useState<DuesInfo | null>(null);
  const [DuesError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (paramsCardinal === 0) return;

    const fetchDuesInfo = async () => {
      setLoading(true);
      try {
        const response = await getDuesInfo(paramsCardinal);
        const { data } = response.data;
        setDuesInfoInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuesInfo();
  }, [paramsCardinal]);

  return { duesInfo, DuesError, loading };
};

export default useGetDuesInfo;
