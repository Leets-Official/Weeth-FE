import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createEvent = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/admin/events`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const EditEvent = async (data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/admin/events`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        },
      },
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default createEvent;
