import { PostRequestType } from '@/types/PostRequestType';
import api from './api';

export const postNotice = async (data: PostRequestType) => {
  return api.patch(`/api/v1/admin/notices/`, data);
};

export default postNotice;
