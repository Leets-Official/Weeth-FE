import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const ACCESSTOKEN = import.meta.env.VITE_MASTER_TOKEN;

const getFileUrl = async (data: File, fileName: string) => {
  const res = await axios.get(`${BASE_URL}/files/`, {
    params: { fileName },
    data,
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  });
  return res.data;
};

export default getFileUrl;
