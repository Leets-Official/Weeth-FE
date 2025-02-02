import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

// API URL
const BASE_URL = import.meta.env.VITE_API_URL;

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레시 토큰을 사용하여 엑세스 토큰을 갱신하는 함수
const getRefreshToken = async () => {
  try {
    const response = await api.post(`/api/v1/users/refresh`);
    if (response.data.code === 200) {
      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.refreshToken;
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      return { newAccessToken, newRefreshToken };
    }
    throw new Error('리프레시 토큰 재발급 실패');
  } catch (error) {
    console.error('리프레시 토큰 오류', error);
    throw error;
  }
};

// Request 인터셉터: 모든 요청에 Authorization 헤더를 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 기존 headers를 기반으로 AxiosHeaders 객체 생성
    const newHeaders = new AxiosHeaders(config.headers || {});

    if (accessToken) {
      newHeaders.set('Authorization', `Bearer ${accessToken}`);
    }
    if (refreshToken) {
      newHeaders.set('Authorization_refresh', `Bearer ${refreshToken}`);
    }

    // config 객체를 직접 변경하지 않고, 새 객체를 만들어 반환
    const modifiedConfig = {
      ...config,
      headers: newHeaders,
    };

    return modifiedConfig;
  },
  (error) => Promise.reject(error),
);

// Response 인터셉터: 401 Unauthorized 에러 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        const { newAccessToken, newRefreshToken } = await getRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization_refresh = `Bearer ${newRefreshToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰도 만료되었습니다.', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  },
);

export default api;
