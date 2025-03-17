import api from '@/api/api';

const BASE_URL =
  window.location.hostname === 'weeth.site'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

// 대댓글일 경우만 parentCommentId 보내주기
const createComment = async (
  postId: number,
  content: string,
  parentCommentId?: number,
) => {
  // 현재 URL의 경로에서 "posts" 또는 "notice" 결정
  const currentPath = window.location.pathname;
  const boardType = currentPath.includes('/notice') ? 'notices' : 'board';

  return api.post(`${BASE_URL}/api/v1/${boardType}/${postId}/comments`, {
    parentCommentId,
    content,
  });
};

export default createComment;
