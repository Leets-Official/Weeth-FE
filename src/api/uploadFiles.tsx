/* eslint-disable no-console */
import axios from 'axios';
import qs from 'qs';

const BASE_URL = import.meta.env.VITE_API_URL;
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

// 파일을 Presigned URL로 업로드하는 함수
const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type, // 파일의 MIME 타입 설정
      },
    });
    return response.status === 200; // 업로드 성공 여부 반환
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return false;
  }
};

export const getFileUrl = async (fileNames: string[], files: File[]) => {
  // 파일이 없으면 요청을 보내지 않고 빈 배열을 반환
  if (fileNames.length === 0 || files.length === 0) {
    console.log('No files to upload, skipping the request.');
    return [];
  }

  // 1. 서버에서 Presigned URL 요청
  const response = await axios.get(`${BASE_URL}/files/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: {
      fileName: fileNames,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  const presignedUrls = response.data.data; // Presigned URL 배열

  console.log(presignedUrls);

  // 2. 각 파일을 Presigned URL로 업로드
  const uploadResults = await Promise.all(
    files.map((file, index) =>
      uploadFileToS3(presignedUrls[index].putUrl, file),
    ),
  );

  if (uploadResults.every((result) => result)) {
    console.log('All files uploaded successfully.');
  } else {
    console.error('Some files failed to upload.');
  }

  return presignedUrls;
};

export default getFileUrl;
