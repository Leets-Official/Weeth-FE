import { PostRequestType } from '@/types/PostRequestType';
import api from './api';

export const editBoard = async (data: PostRequestType, postId: number) => {
  return api.patch(`/api/v1/posts/${postId}`, data);
};

export default editBoard;
