import { useEffect, useContext } from 'react';
import axios from 'axios';
import { NoticeContext } from './NoticeContext';

const NoticeAPI: React.FC = () => {
  const { setNotices } = useContext(NoticeContext);

  const accessToken = localStorage.getItem('accessToken') || '';

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        // API 호출
        const response = await axios.get(`${BASE_URL}/api/v1/notices`, {
          headers,
          params: { count: 5 }, // 추가 posts 길이 5로 설정
        });

        const result = response.data;

        if (result.code === 200) {
          setNotices(result.data);
        } else {
          console.error('Failed to fetch notices:', result.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching notices:', error);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    };

    fetchNoticeData();
  }, [accessToken, setNotices]);

  return null;
};

export default NoticeAPI;
