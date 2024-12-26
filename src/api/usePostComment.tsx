import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// 댓글 작성 API 함수
// 대댓글일 경우만 parentCommentId 보내주기
const createComment = async (
  postId: number,
  content: string,
  parentCommentId?: number,
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return axios.post(
    `${BASE_URL}/api/v1/posts/${postId}/comments`,
    { parentCommentId, content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

export default createComment;
