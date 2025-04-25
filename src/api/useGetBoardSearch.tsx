import api from './api';

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
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

const BASE_URL = import.meta.env.VITE_API_URL;

const useGetBoardSearch = async (
  keyword: string,
  pageNumber: number,
  appendPosts: (newPosts: Content[]) => void,
) => {
  try {
    const response = await api.get<ApiResponse>(
      `${BASE_URL}/api/v1/board/search`,
      {
        params: { keyword, pageNumber, pageSize: 10 },
      },
    );

    const { data } = response.data;
    appendPosts(data.content);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default useGetBoardSearch;
