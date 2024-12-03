import { useEffect, useContext } from 'react';
import axios from 'axios';
import { GetAllPostsContext } from '@/api/GetAllPostsContext';

const GetAllPosts = ({ path }: { path: string }) => {
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
          params: { pageNumber: 0, pageSize: 5 }, // 추가 posts 길이 5로 설정
        });

        const result = response.data;

        if (result.code === 200) {
          setPosts(result.data.content);
        } else {
          console.error('Failed to fetch notices:', result.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching notices:', error);
      }
    };

    fetchNoticeData();
  }, [accessToken, path, setPosts]);

  return null;
};

export default GetAllPosts;
