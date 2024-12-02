import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = import.meta.env.VITE_API_URL;

export interface EventRequestType {
  title: string;
  start: string;
  end: string;
  location: string;
  requiredItem: string;
  memberCount: string;
  content: string;
}

export const createEvent = async (data: EventRequestType) => {
  const response = await axios.post(`${BASE_URL}/api/v1/admin/events`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
  return response;
};

export const editEvent = async (data: EventRequestType, id: number) => {
  const response = await axios.patch(
    `${BASE_URL}/api/v1/admin/events/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      },
    },
  );
  return response;
};

export const deleteEvent = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/api/v1/admin/events/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
  });
  return response;
};
