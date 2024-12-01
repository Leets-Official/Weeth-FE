// Utils.ts
import { AxiosResponse } from 'axios';

// API 응답 타입 정의
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ApiResponse<T = any> = {
  status: number;
  data: T;
  headers: {
    authorization?: string;
    authorization_refresh?: string;
  };
};

// Utils 함수 정의
const Utils = async <T>(
  response: AxiosResponse<T>,
  originalApiFunc: (...args: any[]) => Promise<AxiosResponse<T>>,
  originalParams: any[],
): Promise<AxiosResponse<T>> => {
  // 데이터가 비어있는지 확인
  const isResponseBodyEmpty = (data: any): boolean => {
    if (data === null || data === undefined || data === '') {
      return true;
    }
    if (typeof data === 'object') return Object.keys(data).length === 0;
    if (Array.isArray(data)) return data.length === 0;
    return false;
  };

  if (response.status === 200) {
    // Body가 비어 있지 않으면 데이터를 반환
    if (!isResponseBodyEmpty(response.data)) {
      return response;
    }
    // Body가 비어있다면 새로운 토큰이 있는지 확인하고, 로컬 스토리지에 저장
    const newToken = response.headers.authorization;
    const newRefreshToken = response.headers.authorization_refresh;
    if (newToken && newRefreshToken) {
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // 새로운 토큰으로 원래의 API 호출을 다시 시도
      const retryResponse = await originalApiFunc(...originalParams);
      return retryResponse;
    }
    throw new Error('새 토큰이 없습니다');
  } else if (response.status === 403) {
    // 403 상태 코드일 경우 토큰이 만료되었으므로 로컬 스토리지를 비우고 로그인 페이지로 리다이렉트
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw new Error('Forbidden: 로그인 화면으로 리디렉션합니다.');
  } else {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
};

export default Utils;
