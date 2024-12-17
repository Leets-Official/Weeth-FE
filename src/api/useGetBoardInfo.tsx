import axios from 'axios';

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: Content[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

const useGetBoardInfo = async (
  BASE_URL: string,
  path: string,
  pageNumber: number,
  setPosts: React.Dispatch<React.SetStateAction<Content[]>>,
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // 중복 호출 방지
  setIsLoading(true);

  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    console.log('Fetching page:', pageNumber);
    const response = await axios.get<ApiResponse>(
      `${BASE_URL}/api/v1/${path}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        },
        params: { pageNumber, pageSize: 10 },
      },
    );

    const { data } = response.data;

    // 데이터 병합
    setPosts((prevPosts) => [...prevPosts, ...data.content]);
    // 마지막 페이지 여부 설정
    setHasMore(!data.last);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setIsLoading(false);
  }
};

export default useGetBoardInfo;
