import axios from 'axios';

interface AttendCheckType {
  code: string;
}

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = import.meta.env.VITE_API_URL;

export const patchAttend = async (data: AttendCheckType) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Authorization_refresh: `Bearer ${refreshToken}`,
  };

  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/attendances`, data, {
      headers,
    });
    return response;
  } catch (error) {
    console.error('Attendance code check error:', error);
    throw error;
  }
};

export default patchAttend;
