/* eslint-disable no-console */
import { PostRequestType } from '@/types/PostRequestType';
import axios from 'axios';
import api from './api';

interface originFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

// 파일을 업로드할 수 있는 presigned URL을 요청하는 함수
const getPresignedUrl = async (file: File, fileName: string) => {
  const res = await api.get(`/files/`, {
    params: { fileName },
    data: file,
  });
  return res.data;
};

// presigned URL로 파일을 업로드하는 함수
const uploadFile = async (url: string, file: File) => {
  const res = await axios.put(url, file);
  return res;
};

// 파일 업로드 후 게시글을 작성하는 함수
export const postBoardNotice = async ({
  originFiles = [],
  files = [],
  postData,
  postType,
  id,
}: {
  originFiles?: originFile[];
  files: File[];
  postData: PostRequestType;
  postType: 'postBoard' | 'postNotice' | 'editBoard' | 'editNotice';
  id?: number;
}) => {
  try {
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const response = await getPresignedUrl(file, file.name);
        // eslint-disable-next-line prefer-destructuring
        const putUrl = response.data[0].putUrl;

        const uploadRes = await uploadFile(putUrl, file);
        if (uploadRes.status !== 200) {
          throw new Error(`파일 업로드에 실패했습니다.`);
        }

        return putUrl.split('?')[0];
      }),
    );

    const updatedPostData = {
      ...postData,
      files: [
        ...originFiles, // ✅ 기존 파일 유지
        ...files.map((file, index) => ({
          fileName: file.name,
          fileUrl: fileUrls[index],
        })),
      ],
    };

    let endpoint = '';
    let method: 'post' | 'patch' = 'post';

    switch (postType) {
      case 'postBoard':
        endpoint = `/api/v1/posts`;
        method = 'post';
        break;
      case 'postNotice':
        endpoint = `/api/v1/admin/notices`;
        method = 'post';
        break;
      case 'editBoard':
        endpoint = `/api/v1/posts/${id}`;
        method = 'patch';
        break;
      case 'editNotice':
        endpoint = `/api/v1/admin/notices/${id}`;
        method = 'patch';
        break;
      default:
        throw new Error('잘못된 postType 입니다.');
    }

    const postRes = await api[method](endpoint, updatedPostData);
    return postRes;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export default postBoardNotice;
