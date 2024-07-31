import axios from 'axios';

const setupInterceptors = (navigate) => {
  const instance = axios.create({
    baseURL: 'http://13.125.78.31:8080',
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      // eslint-disable-next-line no-underscore-dangle
      if (error.response.status === 401 && !originalRequest._retry) {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await instance.post('/refresh', { refreshToken });
            const newToken = response.headers.authorization;
            localStorage.setItem('accessToken', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
            return Promise.reject(err);
          }
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
          return Promise.reject(error);
        }
      } else if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default setupInterceptors;
