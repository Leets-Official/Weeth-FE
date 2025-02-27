import { PostRequestType } from '@/types/PostRequestType';
import api from './api';

export const postBoard = async (data: PostRequestType) => {
  return api.patch(`/api/v1/posts/`, data);
};

export default postBoard;
