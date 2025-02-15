import api from './api';

export interface EventRequestType {
  title: string;
  cardinal: number;
  isMeeting: boolean;
  start: string;
  end: string;
  location: string;
  requiredItem: string;
  content: string;
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
