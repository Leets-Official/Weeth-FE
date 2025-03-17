import api from '@/api/api';

const BASE_URL =
  window.location.hostname === 'weeth.site'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

const deleteComment = async (
  path: string,
  postId: number,
  commentId: number,
) => {
  return api.delete(
    `${BASE_URL}/api/v1/${path}/${postId}/comments/${commentId}`,
  );
};

export default deleteComment;
