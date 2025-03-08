import { PostRequestType } from '@/types/PostRequestType';
import api from './api';

export const editNotice = async (data: PostRequestType, postId: number) => {
  return api.patch(`/api/v1/notices/${postId}`, data);
};

export default editNotice;
