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
export const postBoard = async (files: File[], postData: PostRequestType) => {
  try {
    // 1. 각 파일에 대해 presigned URL을 요청하고 업로드
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        // getPresignedUrl로 응답 받은 데이터에서 destructuring 사용
        const [{ putUrl, fileUrl }] = await getPresignedUrl(file, file.name);

        const uploadRes = await uploadFile(putUrl, file);
        if (uploadRes.status !== 200) {
          throw new Error(`파일 업로드에 실패했습니다.`);
        }

        // 업로드가 성공하면 실제 URL을 반환
        return fileUrl;
      }),
    );

    console.log('fileUrls', fileUrls);

    // 2. 새로운 객체를 생성하여 files 필드 추가
    const updatedPostData = {
      ...postData,
      files: files.map((file, index) => ({
        fileName: file.name,
        fileUrl: fileUrls[index], // 실제 파일 URL을 설정
      })),
    };

    console.log(updatedPostData);

    // 3. 모든 파일이 업로드된 후, 게시글 작성
    const postRes = await api.post(`/api/v1/posts`, updatedPostData);
    return postRes;
  } catch (error) {
    console.error('에러 발생:', error);
    throw error;
  }
};

export default postBoard;
