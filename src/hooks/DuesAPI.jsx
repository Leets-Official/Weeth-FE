import { useEffect, useContext } from 'react';
import axios from 'axios';
import { DuesContext } from './DuesContext';

const DuesAPI = () => {
  const {
    myCardinal,
    setDuesData,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
  } = useContext(DuesContext);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchDuesData = async () => {
      try {
        const cardinal = 3;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const BASE_URL = process.env.REACT_APP_BASE_URL;

        // 비동기 요청에 await 추가
        const response = await axios.get(`${BASE_URL}/account/${cardinal}`, {
          headers,
        });

        const result = response.data;

        if (result.code === 200) {
          if (result.data.cardinal !== myCardinal) {
            setDuesData(result.data.receipts);
            setTotalAmount(result.data.totalAmount);
            setCardinal(result.data.cardinal);
            setCurrentAmount(result.data.currentAmount);
          }
        } else {
          console.error('Failed to get data:', result.message);
        }
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchDuesData(); // 비동기 함수를 호출
  }, [
    accessToken,
    myCardinal,
    setDuesData,
    setTotalAmount,
    setCurrentAmount,
    setCardinal,
  ]);

  return null;
};

export default DuesAPI;
