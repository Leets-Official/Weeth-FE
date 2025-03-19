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

const getDuesInfo = async (paramsCardinal: number | null) => {
  return api.get(`/api/v1/account/${paramsCardinal}`);
};

export const useGetDuesInfo = (paramsCardinal: number | null) => {
  const [duesInfo, setDuesInfo] = useState<DuesInfo | null>(null);
  const [duesError, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (paramsCardinal === null) {
      setLoading(false);
      return;
    }

    const fetchDuesInfo = async () => {
      setLoading(true);
      try {
        const response = await getDuesInfo(paramsCardinal);
        const { data } = response.data;
        setDuesInfo(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuesInfo();
  }, [paramsCardinal]);

  return { duesInfo, duesError, loading };
};

export default useGetDuesInfo;
