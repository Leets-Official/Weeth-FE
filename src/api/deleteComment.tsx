import api from '@/api/api';

const BASE_URL = import.meta.env.VITE_API_URL;

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
