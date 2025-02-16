import api from './api';

export interface EventRequestType {
  title: string;
  content: string;
  location: string;
  requiredItem: string;
  type: 'EVENT' | 'MEETING';
  cardinal: number;
  start: string;
  end: string;
}

export const createEvent = async (data: EventRequestType) => {
  const response = await api.post(`/api/v1/admin/events`, data);
  return response;
};

export const editEvent = async (data: EventRequestType, id: number) => {
  const response = await api.patch(`/api/v1/admin/events/${id}`, data);
  return response;
};

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/api/v1/admin/events/${id}`);
  return response;
};
