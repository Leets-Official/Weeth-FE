import { useEffect, useContext } from 'react';
import axios from 'axios';
import { DuesContext } from '@/service/DuesContext';
import Utils from '@/service/Utils';

// DuesAPI 컴포넌트
const DuesAPI: React.FC = () => {
  const {
    myCardinal,
    setDuesData,
    setDescription,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
    setTime,
  } = useContext(DuesContext);

  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';

  useEffect(() => {
    const fetchDuesData = async () => {
      try {
        const cardinal = 4;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        };
        const BASE_URL = import.meta.env.VITE_API_URL;

        const originalApiFunc = (funcCardinal: number) =>
          axios.get(`${BASE_URL}/api/v1/account/${funcCardinal}`, { headers });

        // API 호출을 Utils로 처리
        const response = await Utils(
          await originalApiFunc(cardinal),
          originalApiFunc,
          [cardinal]
        );

        const result = response.data;

        if (result.code === 200) {
          if (result.data.cardinal !== myCardinal) {
            setDuesData(result.data.receipts);
            setDescription(result.data.description);
            setTotalAmount(result.data.totalAmount);
            setCardinal(result.data.cardinal);
            setCurrentAmount(result.data.currentAmount);
            setTime(result.data.time);
            // console.log(result);
          }
        } else {
          // console.error('Failed to get data:', result.message);
        }
      } catch (error) {
        // 무한 리다이렉션 방지
        if (window.location.pathname !== '/login') {
          // console.error('An error occurred while fetching the data');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    };

    fetchDuesData();
  }, [
    accessToken,
    myCardinal,
    setDuesData,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
    setTime,
  ]);

  return null;
};

export default DuesAPI;
