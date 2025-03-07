/* eslint-disable no-console */
import { PostRequestType } from '@/types/PostRequestType';
import axios from 'axios';
import api from './api';

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
export const postBoardNotice = async (
  files: File[],
  postData: PostRequestType,
  postType: 'postBoard' | 'postNotice' | 'editBoard' | 'editNotice',
  id?: number,
) => {
  try {
    // 1. 각 파일에 대해 presigned URL을 요청하고 업로드
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const response = await getPresignedUrl(file, file.name);
        // eslint-disable-next-line prefer-destructuring
        const putUrl = response.data[0].putUrl;

        const uploadRes = await uploadFile(putUrl, file);
        if (uploadRes.status !== 200) {
          throw new Error(`파일 업로드에 실패했습니다.`);
        }

        return putUrl.split('?')[0]; // 실제 파일 URL 반환
      }),
    );

    // 2. postData에 파일 정보 추가
    const updatedPostData = {
      ...postData,
      files: files.map((file, index) => ({
        fileName: file.name,
        fileUrl: fileUrls[index],
      })),
    };

    console.log('최종 요청 데이터:', updatedPostData);

    let endpoint = '';
    let method: 'post' | 'put' = 'post';

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
        method = 'put';
        break;
      case 'editNotice':
        endpoint = `/api/v1/admin/notices/${id}`;
        method = 'put';
        break;
      default:
        throw new Error('잘못된 postType 입니다.');
    }

    // 4. API 요청 실행
    const postRes = await api[method](endpoint, updatedPostData);
    return postRes;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export default postBoardNotice;
