import axios from 'axios';

const getPresignedUrl = async (url: string, data: File) => {
  const res = await axios.put(`${url}`, data);
  return res;
};

export default getPresignedUrl;
