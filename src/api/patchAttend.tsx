import api from '@/api/api';

interface AttendCheckType {
  code: string;
}

const BASE_URL =
  window.location.hostname === 'weeth.site'
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_API_URL_DEV;

export const patchAttend = async (data: AttendCheckType) => {
  try {
    const response = await api.patch(`${BASE_URL}/api/v1/attendances`, data);
    return response;
  } catch (error) {
    console.error('Attendance code check error:', error);
    throw error;
  }
};

export default patchAttend;
