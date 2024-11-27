import { useEffect, useContext } from 'react';
import axios from 'axios';
import { GetAllPostsContext } from '@/api/GetAllPostsContext';

interface GetAllPostsProps {
  path: string;
}

const GetAllPosts: React.FC<GetAllPostsProps> = ({ path }) => {
  const { setPosts } = useContext(GetAllPostsContext);

  const accessToken = localStorage.getItem('accessToken') || '';

  useEffect(() => {
    const fetchNoticeData = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_URL;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        console.log(`${BASE_URL}/api/v1/${path}`);

        // API 호출
        const response = await axios.get(`${BASE_URL}/api/v1/${path}`, {
          headers,
          params: { count: 5 }, // 추가 posts 길이 5로 설정
        });

        const result = response.data;

        if (result.code === 200) {
          setPosts(result.data);
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
  }, [accessToken, path, setPosts]);

  return null;
};

export default GetAllPosts;
