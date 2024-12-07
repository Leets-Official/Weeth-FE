import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Receipt {
  id: number;
  amount: number;
  description: string;
  images: string[];
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
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.get(`${BASE_URL}/api/v1/account/${paramsCardinal}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
};

export const useGetDuesInfo = (paramsCardinal: number) => {
  const [duesInfo, setDuesInfoInfo] = useState<DuesInfo | null>(null);
  const [DuesError, setError] = useState<string | null>(null);

  useEffect(() => {
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
